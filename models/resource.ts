import { Node } from "~/models/node.ts";

export interface Resource {
  [k: string]: "TEXT" | "BINARY";
}

export interface ResourceNode extends Node {
  uri: string;

  type: string;

  resourceType: "BINARY" | "TEXT";

  value: string;
}

export async function fetcher(resource: Resource): Promise<ResourceNode[]> {
  const resourceNodes = await Promise.all(
    Object.entries(resource).map(async ([uri, type]) => {
      const res = await fetch(uri);
      const value = await res.text();

      const resourceNode: ResourceNode = {
        value,
        uri,
        type: "RESOURCE",
        resourceType: type,
      };

      return resourceNode;
    }),
  );

  return resourceNodes;
}

export function isResourceNode(node: Node): node is ResourceNode {
  return node.type.toUpperCase() === "RESOURCE";
}
