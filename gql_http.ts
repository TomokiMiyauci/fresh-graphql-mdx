import { graphqlHttp } from "graphql_http/mod.ts";
import { dirname, fromFileUrl, join } from "std/path/mod.ts";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "~/schema/resolvers.ts";
import { ContextValue } from "~/types.ts";
import { fromFileSystem, graphqlMdx, resolvePlugins } from "~/utils/mdx.ts";
import remarkGfm from "https://esm.sh/remark-gfm@3.0.1";
import rehypeHighlight from "https://esm.sh/rehype-highlight@5.0.2";
import rehypeKatex from "https://esm.sh/rehype-katex@6.0.2";
import remarkMath from "https://esm.sh/remark-math@5.1.1";
import remarkSmartypants from "https://esm.sh/remark-smartypants@2.0.0";
import emoji from "https://esm.sh/remark-emoji@3.0.2";

const baseDir = dirname(fromFileUrl(import.meta.url));
const filePath = join(baseDir, "schema.graphql");
const schemaStr = await Deno.readTextFile(filePath);

const schema = makeExecutableSchema({
  typeDefs: schemaStr,
  resolvers,
});
const baseUrl = fromFileUrl(import.meta.url);
const rootDir = dirname(baseUrl);
const context = {
  rootDir,
  baseUrl,
};

const nodes = await resolvePlugins([
  fromFileSystem("./posts/**/*.mdx"),
  graphqlMdx({
    compilerOptions: {
      jsxImportSource: "preact",
      outputFormat: "function-body",
      remarkPlugins: [
        remarkGfm,
        remarkMath,
        [emoji, { emoticon: true }],
        remarkSmartypants,
      ],
      rehypePlugins: [rehypeHighlight, rehypeKatex],
    },
  }),
], context);

const contextValue: ContextValue = {
  meta: context,
  nodes,
};

const GraphQLHTTP = graphqlHttp({
  playground: true,
  schema,
  contextValue,
});

export default GraphQLHTTP;
