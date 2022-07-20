// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '../assert'
import * as fs from 'node:fs/promises'

import { VoltisoScriptError } from '../VoltisoScriptError.js'
import { findPackageJson } from './findPackageJson.js'
import type { PackageJson } from './packageJson.js'

export async function readPackageJson(): Promise<PackageJson> {
	const packageJsonPath = await findPackageJson()
	assert(packageJsonPath)

	// eslint-disable-next-line security/detect-non-literal-fs-filename
	const packageJsonBuffer = await fs.readFile(packageJsonPath)
	const packageJson = JSON.parse(packageJsonBuffer.toString()) as
		| PackageJson
		| undefined

	if (!packageJson) throw new VoltisoScriptError('cannot read package.json')

	return packageJson
}
