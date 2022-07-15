/** @jsx h */
import { Fragment, h } from "preact";
import { Handler, PageProps } from "fresh/server.ts";
import { Head } from "fresh/runtime.ts";
import { tw } from "@twind";
import GraphQLHTTP from "~/gql_http.ts";
import { gqlRequest, resolveResponse } from "~/utils/gql_fetches.ts";
import { MdxQuery, QueryMdxArgs } from "~/graphql_types.ts";
import { Status, STATUS_TEXT } from "std/http/mod.ts";
import { run } from "@mdx-js/mdx";
import * as runtime from "preact/jsx-runtime";
import type { MDXContent as MDXContentType, MDXModule } from "types/mdx";
import MdxComponents from "~/components/Mdx.tsx";

const query = /* GraphQL */ `query Mdx($slug: String) {
  mdx(slug: $slug, compilerOptions:{ outputFormat: FUNCTION_BODY, jsxImportSource: "preact"}) {
    jsx
  }
}
`;

export const handler: Handler<{ MDXContent: MDXContentType }> = async (
  req,
  ctx,
) => {
  const url = new URL(req.url);
  const variables: QueryMdxArgs = {
    slug: url.pathname,
  };
  const endpoint = new URL("/graphql", req.url);
  const request = gqlRequest({ endpoint, query }, {
    variables,
  });
  const res = await GraphQLHTTP(request);
  const { mdx } = await resolveResponse<MdxQuery>(res);
  if (!mdx) {
    return new Response(STATUS_TEXT[Status.NotFound], {
      status: Status.NotFound,
    });
  }

  const { default: MDXContent } = await run(mdx.jsx, runtime) as MDXModule;

  return ctx.render({ MDXContent });
};

export default function Home(
  { data: { MDXContent } }: PageProps<{ MDXContent: MDXContentType }>,
) {
  return (
    <Fragment>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github-dark.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css"
          crossOrigin="anonymous"
        />
      </Head>
      <main>
        <article
          class={tw`prose max-w-prose mx-auto`}
        >
          <MDXContent components={MdxComponents} />
        </article>
      </main>
    </Fragment>
  );
}
