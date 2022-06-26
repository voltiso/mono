import * as fs from "fs/promises";
import path from "path";
import { readPackageJson } from "../packageJson.js";
import { printInfo } from "../_/printInfo.js";
import { getCompatDirNames } from "./getCompatDirNames.js";

const dryRun = false; // TODO: expose option

export async function cleanCompatDirs() {
	const packageJson = await readPackageJson();
	const compatDirNames = getCompatDirNames(packageJson);

	await Promise.all(
		compatDirNames.map(async (dirName) => {
			const resolvedPath = path.resolve(dirName);
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			if (dryRun) {
				printInfo("DRY RUN: would delete:", resolvedPath);
			} else {
				await fs.rm(resolvedPath, { recursive: true, force: true });
			}
		})
	);
}
