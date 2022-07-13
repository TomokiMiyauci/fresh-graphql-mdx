import { fetcher, Resource, ResourceNode } from "~/models/resource.ts";

export function graphqlResource(resource: Resource): ResourceNode {
  fetcher(resource);
}
