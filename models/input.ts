import { Node } from "~/models/node.ts";

export interface InputNode extends Node {
  type: "INPUT";

  value: string;
}
