import { Node } from "~/models/node.ts";

export type ContextValue = {
  meta: {
    baseUrl: string;
    rootDir: string;
  };

  nodes: Node[];
};
