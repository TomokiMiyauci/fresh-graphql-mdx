import { Mdx as MdxSpec } from "~/graphql_types.ts";
import { compileSync } from "@mdx-js/mdx";
import { File } from "~/graphql_types.ts";

export default class Mdx implements MdxSpec {
  #file: File;
  #slug: string | undefined;

  constructor(
    { file }: Readonly<{ file: File }>,
    { slug }: Partial<{ slug: string }> = {},
  ) {
    this.#file = file;
    this.#slug = slug;
  }

  get raw() {
    return this.#file.value;
  }

  get jsx() {
    const vfile = compileSync(this.raw, {
      jsxImportSource: "preact",
    });

    return vfile.value.toString();
  }

  get slug() {
    return this.#slug;
  }
}
