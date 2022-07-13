export interface RawNode {
  type: "RAW";

  valueType: "BIN" | "TEXT";

  value: string;
}
