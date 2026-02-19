// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { strict as assert } from 'node:assert'
import * as path from 'node:path'

import { _getPackageForDir } from './getPackageForDir.js'

/** @internal */
export interface _PackagePath {
	package: {
		name: string
		version?: string | undefined
	}
	packagePath: string
}

/** @internal */

export function _getPackageForFile(file: string): _PackagePath {
	// eslint-disable-next-line no-param-reassign
	file = path.resolve(file)

	const dirPath = path.dirname(file)

	const { packageJson, packageJsonPath } = _getPackageForDir(dirPath)
	const packageJsonDirPath = path.dirname(packageJsonPath)

	// eslint-disable-next-line unicorn/consistent-assert
	assert(file.startsWith(packageJsonDirPath))

	return {
		package: {
			name: packageJson.name,
			version: packageJson.version,
		},

		packagePath: file.slice(packageJsonDirPath.length + 1),
	}
}
