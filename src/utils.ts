import { join } from "node:path";

import findCacheDirectory from "find-cache-dir";
import { findUpSync } from "find-up";

/**
 * Get the path of the file or directory with input name inside the Storybook cache directory:
 *
 * - `node_modules/.cache/storybook/{directoryName}` in a Node.js project or npm package
 * - `.cache/storybook/{directoryName}` otherwise
 *
 * @param fileOrDirectoryName {string} Name of the file or directory
 * @returns {string} Absolute path to the file or directory
 */
export function resolvePathInStorybookCache(
  fileOrDirectoryName: string,
  sub = "default",
): string {
  let cacheDirectory = findCacheDirectory({ name: "storybook" });
  cacheDirectory ||= join(process.cwd(), ".cache", "storybook");

  return join(cacheDirectory, sub, fileOrDirectoryName);
}

/**
 * @returns {string} The root directory of the project
 */
export const getProjectRoot = () => {
  let result: string | undefined;
  // Allow manual override in cases where auto-detect doesn't work
  // biome-ignore lint/complexity/useLiteralKeys: Ignore
  if (process.env["STORYBOOK_PROJECT_ROOT"]) {
    // biome-ignore lint/complexity/useLiteralKeys: Ignore
    return process.env["STORYBOOK_PROJECT_ROOT"];
  }

  try {
    const found = findUpSync(".git", { type: "directory" });
    if (found) {
      result = join(found, "..");
    }
  } catch (e) {
    //
  }
  try {
    const found = findUpSync(".svn", { type: "directory" });
    if (found) {
      result = result || join(found, "..");
    }
  } catch (e) {
    //
  }
  try {
    const found = findUpSync(".hg", { type: "directory" });
    if (found) {
      result = result || join(found, "..");
    }
  } catch (e) {
    //
  }

  try {
    const splitDirname = __dirname.split("node_modules");
    result = result || (splitDirname.length >= 2 ? splitDirname[0] : undefined);
  } catch (e) {
    //
  }

  try {
    const found = findUpSync(".yarn", { type: "directory" });
    if (found) {
      result = result || join(found, "..");
    }
  } catch (e) {
    //
  }

  return result || process.cwd();
};
