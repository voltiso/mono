// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as fsSync from 'node:fs'
import * as fs from 'node:fs/promises'

// import { assert } from '~/_internal/assert'
import type { SyncerPromise } from '~/syncer'
import { runAsync, runSync } from '~/syncer/run'

import { findPackageJsonSyncer } from './findPackageJson'
import type { PackageJson } from './PackageJson'

export function* findAndReadPackageJsonSyncer(
	dir?: string | undefined,
): SyncerPromise<PackageJson> {
	const packageJsonPath = (yield findPackageJsonSyncer(dir)) as string
	// assert(packageJsonPath)

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
