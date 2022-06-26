import { VoltisoScriptError } from "../VoltisoScriptError.js";
import { findPackageJsonSync } from "./findPackageJson.js";
import type { PackageJson } from "./packageJson.js";

export function readPackageJsonSync(): PackageJson {
	const packageJsonPath = findPackageJsonSync();

	if (!packageJsonPath)
		throw new VoltisoScriptError(`cannot find 'package.json'`);

	const packageJson = require(packageJsonPath) as PackageJson;

	return packageJson;
}
