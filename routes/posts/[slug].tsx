/** @jsx h */
import { h } from "preact";
import { Handler, PageProps } from "fresh/server.ts";
import { tw } from "@twind";
import GraphQLHTTP from "~/gql_http.ts";
import { gqlRequest, resolveResponse } from "~/utils/gql_fetches.ts";
import { MdxQuery, QueryMdxArgs } from "~/graphql_types.ts";
import { Status, STATUS_TEXT } from "std/http/mod.ts";

const query = /* GraphQL */ `query Mdx($slug: String) {
  mdx(slug: $slug, compilerOptions:{ outputFormat: FUNCTION_BODY, jsxImportSource: "preact"}) {
    jsx
    html
  }
}
`;

export const handler: Handler<{ content: string }> = async (
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

  // Deno Deploy is not available new Function or dynamic import
  // const { default: MDXContent } = await run(mdx.jsx, runtime) as {
  //   default: MDXContentType;
  // };

  return ctx.render({ content: mdx.html });
};

export default function Home(
  { data: { content } }: PageProps<{ content: string }>,
) {
  return (
    <main>
      <article
        dangerouslySetInnerHTML={{
          "__html": content,
        }}
        class={tw`prose`}
      >
      </article>
    </main>
  );
}
