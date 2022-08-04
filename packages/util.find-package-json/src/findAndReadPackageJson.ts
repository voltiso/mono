// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/assertor'
import type { PackageJson, SyncerPromise } from '@voltiso/util'
import { runAsync, runSync } from '@voltiso/util'
import * as fsSync from 'node:fs'
import * as fs from 'node:fs/promises'

import { findPackageJsonSyncer } from './findPackageJson'

export function* findAndReadPackageJsonSyncer(
	dir?: string | undefined,
): SyncerPromise<PackageJson> {
	const packageJsonPath = (yield findPackageJsonSyncer(dir)) as string | null
	assert(packageJsonPath)

	const packageJsonBuffer = (yield {
		// eslint-disable-next-line security/detect-non-literal-fs-filename
		async: () => fs.readFile(packageJsonPath),
		// eslint-disable-next-line security/detect-non-literal-fs-filename, n/no-sync
		sync: () => fsSync.readFileSync(packageJsonPath),
	}) as Buffer

	// if (!packageJson) throw new VoltisoScriptError('cannot read package.json')

	return JSON.parse(packageJsonBuffer.toString()) as PackageJson
}

//

export function findAndReadPackageJson(
	dir?: string | undefined,
): Promise<PackageJson> {
	return runAsync(findAndReadPackageJsonSyncer(dir))
}

export function findAndReadPackageJsonSync(
	dir?: string | undefined,
): PackageJson {
	return runSync(findAndReadPackageJsonSyncer(dir))
}