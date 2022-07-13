import { Node } from "~/models/node.ts";
import { isString } from "isx/mod.ts";

export type ResourceType = "BINARY" | "TEXT";

export type ResourceHint =
  | ResourceType
  | {
    type: ResourceType;
  } & Pick<RequestInit, "headers">;

export interface Resource {
  [k: string]: ResourceHint;
}

export interface ResourceNode extends Node {
  url: URL;

  type: string;

  resourceType: "BINARY" | "TEXT";

  value: string;

  request: Request;

  response: Response;
}

export async function fetcher(resource: Resource): Promise<ResourceNode[]> {
  const resourceNodes = await Promise.all(
    Object.entries(resource).map(async ([_url, resourceHint]) => {
      const [resourceType, requestInit] = isString(resourceHint)
        ? [resourceHint]
        : (() => {
          const { type, ...requestInit } = resourceHint;

          return [type, requestInit];
        })();
      const url = new URL(_url);
      const request = new Request(_url, requestInit);

      const response = await fetch(url, requestInit);
      const value = await response.text();

      const resourceNode: ResourceNode = {
        value,
        url,
        request,
        type: "RESOURCE",
        resourceType,
        response,
      };

      return resourceNode;
    }),
  );

  return resourceNodes;
}

export function isResourceNode(node: Node): node is ResourceNode {
  return node.type.toUpperCase() === "RESOURCE";
}
