import { ResourceNode } from "~/models/resource.ts";
import { fromFileUrl, parse } from "std/path/mod.ts";
import { Node } from "~/models/node.ts";

export interface FileNode extends Node {
  /** Absolute path */
  absolutePath: string;

  /** The file name including extension (if any) such as 'index.html' */
  base: string;

  /** The full directory path such as '/home/user/dir' or 'c:\path\dir' */
  dir: string;

  /** The file extension (if any) such as '.html' */
  ext: string;

  type: string;

  value: string;

  /** The file name without extension (if any) such as 'index' */
  name: string;

  fileType: "TEXT" | "BINARY";

  blksize: number | null;

  /**
   * Number of blocks allocated to the file, in 512-byte units.
   * Linux/Mac OS only.
   */
  blocks: number | null;

  /**
   * ID of the device containing the file.
   * Linux/Mac OS only.
   */
  dev: number | null;

  /**
   * Group ID of the owner of this file.
   * Linux/Mac OS only.
   */
  gid: number | null;

  /**
   * Inode number.
   * Linux/Mac OS only.
   */
  ino: number | null;

  /**
   * Number of hard links pointing to this file.
   * Linux/Mac OS only.
   */
  nlink: number | null;

  /**
   * Device ID of this file.
   * Linux/Mac OS only.
   */
  rdev: number | null;

  /** The root of the path such as '/' or 'c:\' */
  root: string;

  /** The size of the file, in bytes. */

  size: number;

  /**
   * User ID of the owner of this file.
   * Linux/Mac OS only.
   */
  uid: number | null;
}

export function createFileNode(node: ResourceNode): FileNode {
  const absolutePath = fromFileUrl(node.url);
  const parsedPath = parse(absolutePath);
  const file = Deno.openSync(absolutePath, {
    read: true,
  });

  const fileInfo = file.statSync();
  file.close();

  return {
    absolutePath,
    type: "FILE",
    fileType: "TEXT",
    value: node.value,
    ...fileInfo,
    ...parsedPath,
  };
}

export function isFileNode(node: Node): node is FileNode {
  return node.type.toUpperCase() === "FILE";
}
