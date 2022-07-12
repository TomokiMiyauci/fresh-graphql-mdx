import { json } from "pure_json/mod.ts";

interface FetchSpec {
  fetch(): Promise<string | json | Blob>;
}

export type Input = {
  resource: string;

  type: "text";
};

export class Fetch implements FetchSpec {
  constructor(public params: Readonly<Input>) {}

  async fetch() {
    const { resource, type } = this.params;

    const res = await fetch(resource);

    switch (type) {
      case "text": {
        return await res.text();
      }
      // case "json": {
      //   return await res.json() as json;
      // }
      // case "blob": {
      //   return await res.blob();
      // }
      default: {
        return "";
      }
    }
  }
}
