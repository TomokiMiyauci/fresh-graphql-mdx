import { graphqlHttp } from "graphql_http/mod.ts";
import { dirname, fromFileUrl, join, toFileUrl } from "std/path/mod.ts";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "~/schema/resolvers.ts";
import { ContextValue } from "~/types.ts";
import { expandGlob } from "std/fs/mod.ts";
import { Fetch, Input } from "~/models/fetcher.ts";
import { FileNode, TextNode } from "~/models/data.ts";
import { File } from "~/graphql_types.ts";

const baseDir = dirname(fromFileUrl(import.meta.url));
const filePath = join(baseDir, "schema.graphql");
const schemaStr = await Deno.readTextFile(filePath);

const asyncEntry = expandGlob(join(baseDir, "posts", "**", "*.mdx"));

const sources: Input[] = [];
for await (const entry of asyncEntry) {
  if (entry.isFile) {
    const input: Input = {
      resource: toFileUrl(entry.path).href,
      type: "text",
    };
    sources.push(input);
  }
}

const mdxInputs: File[] = await Promise.all(
  sources.map(
    async (args) => {
      const fetcher = new Fetch(args);
      const result = await fetcher.fetch();

      const textNode = new TextNode(result);
      const file = new FileNode({ resource: args.resource, node: textNode });
      return file;
    },
  ),
);

const schema = makeExecutableSchema({
  typeDefs: schemaStr,
  resolvers,
});
const baseUrl = fromFileUrl(import.meta.url);
const rootDir = dirname(baseUrl);

const contextValue: ContextValue = {
  mdxInputs,
  meta: {
    baseUrl,
    rootDir,
  },
};

const GraphQLHTTP = graphqlHttp({
  playground: true,
  schema: schema,
  contextValue,
});

export default GraphQLHTTP;
