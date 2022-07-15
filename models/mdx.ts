import { Node } from "~/models/node.ts";
import { CompileOptions } from "@mdx-js/mdx";
import { compileSync } from "@mdx-js/mdx";
import { VFile } from "vfile";
import { fromFileUrl, join, parse, relative } from "std/path/mod.ts";
import { ResourceNode } from "~/models/resource.ts";

export interface MdxNode extends Node {
  type: string;

  raw: string;

  jsx: string;

  compilerOptions?: CompileOptions;

  vfile: VFile;

  slug: string;
}

type Params = {
  node: ResourceNode;
  rootDir: string;
};

type Options = {
  compilerOptions: CompileOptions;
};

function resolveSlug(rootDir: string, filePath: string): string {
  const rPath = relative(rootDir, filePath);
  const { dir, name, root } = parse(rPath);
  const pathBasedSlug = join("/", root, dir, name);
  return pathBasedSlug;
}

export function createMdxNode(
  { node, rootDir }: Readonly<Params>,
  { compilerOptions }: Readonly<Partial<Options>>,
): MdxNode {
  const vfile = compileSync(node.value, compilerOptions);

  const slug = node.url.protocol === "file:"
    ? (() => {
      const absoluteUrl = fromFileUrl(node.url);
      return resolveSlug(rootDir, absoluteUrl);
    })()
    : "";

  return {
    type: "MDX",
    jsx: vfile.value.toString(),
    raw: node.value,
    compilerOptions,
    vfile,
    slug,
  };
}

export function isMdxNode(value: Node): value is MdxNode {
  return value.type.toUpperCase() === "MDX";
}
