import { Mdx, QueryResolvers } from "~/graphql_types.ts";
import { ContextValue } from "~/types.ts";
import { CompileOptionsInput } from "~/graphql_types.ts";
import { CompileOptions } from "@mdx-js/mdx";
import { isMdxNode, MdxNode } from "~/models/mdx.ts";
import { isResourceNode } from "~/models/resource.ts";
import { isFileNode } from "~/models/file.ts";

export const Query: QueryResolvers<ContextValue> = {
  mdx: (_, { slug }, { nodes }) => {
    const mdxNodes = nodes.filter(isMdxNode);
    const mdxNode = mdxNodes.find((mdxNode) => {
      return mdxNode.slug === slug;
    });

    if (!mdxNode) return null;

    return fromMdxNode2Mdx(mdxNode);
  },

  allMdx: (_, __, { nodes }) => {
    return nodes.filter(isMdxNode).map(fromMdxNode2Mdx);
  },

  allResource: (_, __, { nodes }) => {
    return nodes.filter(isResourceNode);
  },

  allFile: (_, __, { nodes }) => {
    return nodes.filter(isFileNode);
  },
};

function fromMdxNode2Mdx(
  { compilerOptions, ...rest }: MdxNode,
): Mdx {
  return {
    compilerOptions: compilerOptions
      ? normalizeCompilerOptions(compilerOptions)
      : {},
    ...rest,
  };
}

function normalizeCompilerOptions(
  { outputFormat, ...rest }: CompileOptions,
): CompileOptionsInput {
  return {
    outputFormat: outputFormat === "function-body"
      ? "FUNCTION_BODY"
      : outputFormat === "program"
      ? "PROGRAM"
      : null,
    ...rest,
  };
}
