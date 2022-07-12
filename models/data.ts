import { File, Text } from "~/graphql_types.ts";
import { fromFileUrl } from "std/path/mod.ts";

export interface Data {
  value: unknown;
}

export class TextNode implements Text {
  constructor(public value: string) {}

  get type() {
    return "TEXT" as const;
  }
}

export class FileNode implements File {
  public resource: string;
  public node: Text;
  constructor(
    { resource, node }: Omit<File, "type" | "value" | "absolutePath">,
  ) {
    this.resource = resource;
    this.node = node;
  }

  get type() {
    return "FILE" as const;
  }

  get value() {
    return this.node.value;
  }

  get absolutePath() {
    return fromFileUrl(this.resource);
  }
}
