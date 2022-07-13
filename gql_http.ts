import { graphqlHttp } from "graphql_http/mod.ts";
import { dirname, fromFileUrl, join, toFileUrl } from "std/path/mod.ts";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "~/schema/resolvers.ts";
import { ContextValue } from "~/types.ts";
import { expandGlob } from "std/fs/mod.ts";
import { FileNodeImpl } from "~/models/file.ts";
import { fetcher, Resource } from "~/models/resource.ts";
import { createMdxNode } from "~/models/mdx.ts";

const baseDir = dirname(fromFileUrl(import.meta.url));
const filePath = join(baseDir, "schema.graphql");
const schemaStr = await Deno.readTextFile(filePath);

const asyncEntry = expandGlob(join(baseDir, "posts", "**", "*.mdx"));

const resource: Resource = {};

for await (const entry of asyncEntry) {
  if (entry.isFile) {
    resource[toFileUrl(entry.path).href] = "TEXT";
  }
}

const resourceNodes = await fetcher(resource);
const fileNodes = resourceNodes.map((resourceNode) =>
  new FileNodeImpl(resourceNode)
);

const schema = makeExecutableSchema({
  typeDefs: schemaStr,
  resolvers,
});
const baseUrl = fromFileUrl(import.meta.url);
const rootDir = dirname(baseUrl);

const mdxNodes = fileNodes.map((node) =>
  createMdxNode({ node, rootDir }, {
    compilerOptions: {
      jsxImportSource: "preact",
      outputFormat: "function-body",
    },
  })
);

const contextValue: ContextValue = {
  meta: {
    baseUrl,
    rootDir,
  },
  nodes: [resourceNodes, fileNodes, mdxNodes].flat(),
};

const GraphQLHTTP = graphqlHttp({
  playground: true,
  schema: schema,
  contextValue,
});

export default GraphQLHTTP;
