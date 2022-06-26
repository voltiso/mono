import * as path from "path";
import * as fs from "fs/promises";
import { printInfo } from "../_/printInfo.js";
import { getCompatDirNames } from "./getCompatDirNames.js";
import { readPackageJson } from "../packageJson.js";
import { VoltisoScriptError } from "../VoltisoScriptError.js";

// eslint-disable-next-line max-statements
export async function writeCompatDirs() {
	const packageJson = await readPackageJson();

	const compatDirsNames = getCompatDirNames(packageJson);

	for (const name of compatDirsNames) {
		try {
			// eslint-disable-next-line no-await-in-loop
			await fs.mkdir(name);
			printInfo("created dir:", name);
			// eslint-disable-next-line no-empty
		} catch {}

		const data = {
			types: `../dist/esm/${name}/index.d.ts`,
			module: `../dist/esm/${name}/index.js`,
			main: `../dist/cjs/${name}/index.js`,
			sideEffects: false,
		};

		// eslint-disable-next-line no-await-in-loop
		const gitignore = await fs.readFile(".gitignore");
		const lines = gitignore.toString();
		const wantLine = `/${name}/`;
		if (!lines.includes(wantLine)) {
			const message = `Please add '${wantLine}' to '.gitignore'!`;
			throw new VoltisoScriptError(message);
		}

		const wantEntry = `${name}/`;
		if (!packageJson.files?.includes(wantEntry)) {
			const message = `Please add '${wantEntry}' to 'package.json/files'`;
			throw new VoltisoScriptError(message);
		}

		try {
			// eslint-disable-next-line no-await-in-loop
			await fs.writeFile(
				path.join(name, "package.json"),
				`${JSON.stringify(data, null, "\t")}\n`,
				{ flag: "w" }
			);
			// eslint-disable-next-line no-empty
		} catch {}
	}
}
