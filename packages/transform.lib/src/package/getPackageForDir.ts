// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { strict as assert } from 'node:assert'
import * as fs from 'node:fs'
import { dirname, join } from 'node:path'

/** @internal */
export type _PackageJson = {
	name: string
	version: string
}

/** @internal */
export type _GetPackageForDirResult = {
	// eslint-disable-next-line etc/no-internal
	packageJson: _PackageJson
	packageJsonPath: string
}

// eslint-disable-next-line etc/no-internal
const packageJsonsByDir = new Map<string, _GetPackageForDirResult>()

/**
 * @throws When not found
 * @internal
 */
export function _getPackageForDirUncached(
	dir: string,
	// eslint-disable-next-line etc/no-internal
): _GetPackageForDirResult {
	const packageJsonPath = join(dir, 'package.json')
	try {
		// eslint-disable-next-line security/detect-non-literal-fs-filename, n/no-sync
		const buffer = fs.readFileSync(packageJsonPath)
		const packageJsonStr = buffer.toString()
		// eslint-disable-next-line etc/no-internal
		const packageJson = JSON.parse(packageJsonStr) as _PackageJson

		return { packageJson, packageJsonPath }
	} catch {
		const parentPath = dirname(dir)
		if (parentPath === dir) throw new Error(`unable to find package.json`)

		// eslint-disable-next-line etc/no-internal
		return _getPackageForDir(dirname(dir))
	}
}

/** @internal */
export function _getPackageForDir(
	dir: string,
	// eslint-disable-next-line etc/no-internal
): _GetPackageForDirResult {
	if (!packageJsonsByDir.has(dir)) {
		// eslint-disable-next-line etc/no-internal
		const result = _getPackageForDirUncached(dir)
		packageJsonsByDir.set(dir, result)
	}

	const result = packageJsonsByDir.get(dir)
	assert(result)
	return result
}
