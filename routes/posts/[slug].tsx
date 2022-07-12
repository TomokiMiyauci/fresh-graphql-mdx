/** @jsx h */
import { h } from "preact";
import { Handler, PageProps } from "fresh/server.ts";
import { tw } from "@twind";
import GraphQLHTTP from "~/gql_http.ts";
import { gqlRequest, resolveResponse } from "~/utils/gql_fetches.ts";
import { MdxQuery, QueryMdxArgs } from "~/graphql_types.ts";
import type { MDXContent as MDXContentType } from "types/mdx";
import { run } from "@mdx-js/mdx";
import * as runtime from "preact/jsx-runtime";

const query = /* GraphQL */ `query Mdx($slug: String) {
  mdx(slug: $slug, compilerOptions:{ outputFormat: FUNCTION_BODY, jsxImportSource: "preact"}) {
    jsx
  }
}
`;

export const handler: Handler<MdxQuery & { MDXContent: MDXContentType }> =
  async (
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
      return new Response("404 Not Found", {
        status: 404,
      });
    }

    const { default: MDXContent } = await run(mdx.jsx, runtime) as {
      default: MDXContentType;
    };

    return ctx.render({ mdx, MDXContent });
  };

export default function Home(
  { data: { MDXContent } }: PageProps<
    MdxQuery & { MDXContent: MDXContentType }
  >,
) {
  return (
    <main>
      <article class={tw`prose`}>
        <MDXContent />
      </article>
    </main>
  );
}
