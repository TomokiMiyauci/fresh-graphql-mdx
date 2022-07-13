import { ResourceNode } from "~/models/resource.ts";
import { fromFileUrl } from "std/path/mod.ts";
import { Node } from "~/models/node.ts";

export interface FileNode extends Node {
  absolutePath: string;

  type: string;

  value: string;
}

export class FileNodeImpl implements FileNode {
  constructor(public node: ResourceNode) {}
  get absolutePath() {
    return fromFileUrl(this.node.uri);
  }

  get type() {
    return "FILE";
  }

  get value() {
    return this.node.value;
  }
}

export function isFileNode(node: Node): node is FileNode {
  return node.type.toUpperCase() === "FILE";
}
