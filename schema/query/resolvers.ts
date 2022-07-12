import { QueryResolvers } from "~/graphql_types.ts";
import { ContextValue } from "~/types.ts";
import { join, parse, relative } from "std/path/mod.ts";
import Mdx from "~/schema/mdx/model.ts";
import { File } from "~/graphql_types.ts";

export const Query: QueryResolvers<ContextValue> = {
  mdxInputs: (_, __, { mdxInputs }) => {
    return mdxInputs;
  },
  mdx: (_, { slug }, { mdxInputs, meta: { rootDir } }) => {
    if (!slug) return null;

    const mdxs = mdxInputs.map((file) => fromFileToMdx(file, rootDir));
    const maybeMdx = mdxs.find((mdx) => mdx.slug === slug);

    if (!maybeMdx) return null;

    return maybeMdx;
  },

  allMdx: (_, __, { mdxInputs, meta: { rootDir } }) => {
    const result = mdxInputs.map((file) => fromFileToMdx(file, rootDir));

    return result;
  },
};

function resolveSlug(rootDir: string, filePath: string): string {
  const rPath = relative(rootDir, filePath);
  const { dir, name, root } = parse(rPath);
  const pathBasedSlug = join("/", root, dir, name);
  return pathBasedSlug;
}

function fromFileToMdx(file: File, rootDir: string): Mdx {
  const pathBasedSlug = resolveSlug(rootDir, file.absolutePath);

  return new Mdx({ file }, { slug: pathBasedSlug });
}
