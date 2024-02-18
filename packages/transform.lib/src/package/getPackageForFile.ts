// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { strict as assert } from 'node:assert'
import { dirname, resolve } from 'node:path'

import { _getPackageForDir } from './getPackageForDir'

/** @internal */
export interface _PackagePath {
	package: {
		name: string
		version?: string | undefined
	}
	packagePath: string
}

/** @internal */
// eslint-disable-next-line etc/no-internal
export function _getPackageForFile(file: string): _PackagePath {
	// eslint-disable-next-line no-param-reassign
	file = resolve(file)

	const dirPath = dirname(file)
	// eslint-disable-next-line etc/no-internal
	const { packageJson, packageJsonPath } = _getPackageForDir(dirPath)
	const packageJsonDirPath = dirname(packageJsonPath)

	assert(file.startsWith(packageJsonDirPath))

	return {
		package: {
			name: packageJson.name,
			version: packageJson.version,
		},

		packagePath: file.slice(packageJsonDirPath.length + 1),
	}
}
