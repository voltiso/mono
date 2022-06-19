import { VoltisoScriptError } from '../VoltisoScriptError'
import { findPackageJsonSync } from './findPackageJson'
import type { PackageJson } from './packageJson'

export function readPackageJsonSync(): PackageJson {
	const packageJsonPath = findPackageJsonSync()

	if (!packageJsonPath)
		throw new VoltisoScriptError(`cannot find 'package.json'`)

	const packageJson = require(packageJsonPath) as PackageJson

	return packageJson
}
