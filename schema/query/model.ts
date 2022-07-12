import { Query as QuerySpec } from "~/graphql_types.ts";

export default class Query implements QuerySpec {
  get allMdx() {
    return [];
  }

  get mdxInputs() {
    return [];
  }
}
