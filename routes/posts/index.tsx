/** @jsx h */
import { h } from "preact";
import { Handler, PageProps } from "fresh/server.ts";
import { tw } from "@twind";
import GraphQLHTTP from "~/gql_http.ts";
import { gqlRequest, resolveResponse } from "~/utils/gql_fetches.ts";
import { AllMdxQuery } from "~/graphql_types.ts";

const query = /* GraphQL */ `query AllMdx {
  allMdx {
    slug
  }
}
`;

export const handler: Handler<AllMdxQuery> = async (
  req,
  ctx,
) => {
  const endpoint = new URL("/graphql", req.url);
  const request = gqlRequest({ endpoint, query });
  const res = await GraphQLHTTP(request);
  const { allMdx } = await resolveResponse<AllMdxQuery>(res);

  return ctx.render({ allMdx });
};

export default function Home(
  { data: { allMdx } }: PageProps<AllMdxQuery>,
) {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <ul>
        {allMdx.map((mdx) => {
          return (
            <li>
              <a href={mdx!.slug!}>{mdx?.slug?.replace("/posts/", "")}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
