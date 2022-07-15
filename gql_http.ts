import { graphqlHttp } from "graphql_http/mod.ts";
import { dirname, fromFileUrl, join } from "std/path/mod.ts";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "~/schema/resolvers.ts";
import { ContextValue } from "~/types.ts";
import { fromFileSystem, graphqlMdx, resolvePlugins } from "~/utils/mdx.ts";

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
