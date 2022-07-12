import { File } from "~/graphql_types.ts";

export type ContextValue = {
  mdxInputs: File[];

  meta: {
    baseUrl: string;
    rootDir: string;
  };
};
