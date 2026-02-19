// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { strict as assert } from 'node:assert'
import * as fs from 'node:fs'
import * as path from 'node:path'

/** @internal */
export interface _PackageJson {
	name: string
	version: string
}

/** @internal */
export interface _GetPackageForDirResult {
	packageJson: _PackageJson
	packageJsonPath: string
}

const packageJsonsByDir = new Map<string, _GetPackageForDirResult>()

/**
 * @throws When not found
 * @internal
 */
export function _getPackageForDirUncached(
	dir: string,
): _GetPackageForDirResult {
	const packageJsonPath = path.join(dir, 'package.json')
	try {
		// eslint-disable-next-line security/detect-non-literal-fs-filename, n/no-sync
		const buffer = fs.readFileSync(packageJsonPath)
		const packageJsonStr = buffer.toString()

		const packageJson = JSON.parse(packageJsonStr) as _PackageJson

		return { packageJson, packageJsonPath }
	} catch {
		const parentPath = path.dirname(dir)
		if (parentPath === dir) throw new Error(`unable to find package.json`)

		return _getPackageForDir(path.dirname(dir))
	}
}

/** @internal */
export function _getPackageForDir(dir: string): _GetPackageForDirResult {
	if (!packageJsonsByDir.has(dir)) {
		const result = _getPackageForDirUncached(dir)
		packageJsonsByDir.set(dir, result)
	}

	const result = packageJsonsByDir.get(dir)
	// eslint-disable-next-line unicorn/consistent-assert
	assert(result)
	return result
}
