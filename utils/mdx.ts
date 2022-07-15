import { Node } from "~/models/node.ts";
import { CompileOptions } from "@mdx-js/mdx";
import { createMdxNode } from "~/models/mdx.ts";
import { fetcher, Resource, ResourceNode } from "~/models/resource.ts";
import { expandGlob } from "std/fs/mod.ts";
import { resolve, toFileUrl } from "std/path/mod.ts";

export type Options = {
  compilerOptions: CompileOptions;
  filter: (resourceNodes: ResourceNode[]) => ResourceNode[];
};

interface Context {
  rootDir: string;
  baseUrl: string;
}

type Plugin = {
  name: string;
  onInput?: (
    ctx: Readonly<Context>,
  ) => Resource | Promise<Resource>;
  onTransform?: (nodes: ResourceNode[], ctx: Readonly<Context>) => Node[];
};

export async function resolvePlugins(
  plugins: Plugin[],
  ctx: Context,
): Promise<Node[]> {
  const onInputs = filterTruthy(plugins.map(({ onInput }) => onInput));

  const resources = (await Promise.all(onInputs.map((exec) => exec(ctx))))
    .flat();

  const resource = resources.reduce(
    (acc, cur) => ({ ...acc, ...cur }),
    {} as Resource,
  );
  const resourceNodes = await fetcher(resource);
  const onTransforms = filterTruthy(
    plugins.map(({ onTransform }) => onTransform),
  );

  const transformedNodes = onTransforms.map((exec) => exec(resourceNodes, ctx))
    .flat();

  return [...resourceNodes, ...transformedNodes];
}

export function fromFileSystem(path: string): Plugin {
  return {
    name: "file-system",
    onInput: async (ctx) => {
      const asyncEntry = expandGlob(resolve(ctx.rootDir, path));
      const resource: Resource = {};

      for await (const entry of asyncEntry) {
        if (entry.isFile) {
          resource[toFileUrl(entry.path).href] = "TEXT";
        }
      }
      return resource;
    },
  };
}

export function graphqlMdx(
  { filter = (nodes) => nodes.filter(maybeMdxNode), compilerOptions }: Partial<
    Options
  >,
): Plugin {
  return {
    name: "graphql-mdx",
    onTransform: (nodes, ctx) => {
      const targetNodes = filter(nodes);
      return targetNodes.map((node) => {
        return createMdxNode({
          node,
          rootDir: ctx.rootDir,
        }, {
          compilerOptions,
        });
      });
    },
  };
}

export function filterTruthy<T>(value: T[]): (Exclude<T, undefined | null>)[] {
  return value.filter(Boolean) as never;
}

function maybeMdxNode(node: ResourceNode): boolean {
  return node.url.protocol === "file:" && node.url.href.endsWith(".mdx");
}
