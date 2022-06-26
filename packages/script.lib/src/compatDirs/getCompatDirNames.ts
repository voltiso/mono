import { PackageJson } from "../packageJson/packageJson.js";
import { VoltisoScriptError } from "../VoltisoScriptError.js";

export function getCompatDirNames(packageJson: PackageJson): string[] {
	const obj = packageJson.typesVersions?.["*"];

	if (!obj) {
		throw new VoltisoScriptError("no `typesVersions['*']` in `package.json`");
	}

	return Object.keys(obj);
}
