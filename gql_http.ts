import { graphqlHttp } from "graphql_http/mod.ts";
import { dirname, fromFileUrl, join, toFileUrl } from "std/path/mod.ts";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "~/schema/resolvers.ts";
import { ContextValue } from "~/types.ts";
import { expandGlob } from "std/fs/mod.ts";
import { createFileNode } from "~/models/file.ts";
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
  createFileNode(resourceNode)
);

const schema = makeExecutableSchema({
  typeDefs: schemaStr,
  resolvers,
});
const baseUrl = fromFileUrl(import.meta.url);
const rootDir = dirname(baseUrl);

import remarkGfm from "https://esm.sh/remark-gfm";
import rehypeHighlight from "https://esm.sh/rehype-highlight";
import rehypeKatex from "https://esm.sh/rehype-katex";
import remarkMath from "https://esm.sh/remark-math";
import remarkSmartypants from "https://esm.sh/remark-smartypants";
import emoji from "https://esm.sh/remark-emoji";
const mdxNodes = fileNodes.map((node) =>
  createMdxNode({ node, rootDir }, {
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
