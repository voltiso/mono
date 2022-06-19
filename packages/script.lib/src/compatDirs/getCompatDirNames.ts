import { PackageJson } from '../packageJson/packageJson'
import { VoltisoScriptError } from '../VoltisoScriptError'

export function getCompatDirNames(packageJson: PackageJson): string[] {
	const obj = packageJson.typesVersions?.['*']

	if (!obj) {
		throw new VoltisoScriptError("no `typesVersions['*']` in `package.json`")
	}

	return Object.keys(obj)
}
