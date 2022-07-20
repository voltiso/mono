// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { VoltisoScriptError } from '../VoltisoScriptError.js'
import { findPackageJsonSync } from './findPackageJson.js'
import type { PackageJson } from './packageJson.js'

export function readPackageJsonSync(): PackageJson {
	const packageJsonPath = findPackageJsonSync()

	if (!packageJsonPath)
		throw new VoltisoScriptError(`cannot find 'package.json'`)

	return require(packageJsonPath) as PackageJson
}
