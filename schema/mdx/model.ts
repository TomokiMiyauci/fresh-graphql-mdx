import { Mdx as MdxSpec } from "~/graphql_types.ts";
import { CompileOptions, compileSync } from "@mdx-js/mdx";
import { File } from "~/graphql_types.ts";

export default class Mdx implements MdxSpec {
  #file: File;
  #slug: string | undefined;
  #compilerOptions: CompileOptions | undefined;

  constructor(
    { file }: Readonly<{ file: File }>,
    { slug, compilerOptions }: Partial<
      { slug: string; compilerOptions: CompileOptions }
    > = {},
  ) {
    this.#file = file;
    this.#slug = slug;
    this.#compilerOptions = compilerOptions;
  }

  get raw() {
    return this.#file.value;
  }

  get jsx() {
    const vfile = compileSync(this.raw, this.#compilerOptions);

    return vfile.value.toString();
  }

  get slug() {
    return this.#slug;
  }
}
