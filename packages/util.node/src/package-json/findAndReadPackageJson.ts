// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable n/no-sync */

import * as fsSync from 'node:fs'
import * as fs from 'node:fs/promises'

import type { SyncerPromise } from '@voltiso/util'
import { $fastAssert, runAsync, runSync } from '@voltiso/util'
import type { PackageJson } from '@voltiso/util.package-json'

import { findPackageJsonSyncer } from './findPackageJson'

export function* findAndReadPackageJsonSyncer(
	dir?: string | undefined,
): SyncerPromise<PackageJson> {
	const packageJsonPath = (yield findPackageJsonSyncer(dir)) as string | null
	$fastAssert(packageJsonPath)

	const packageJsonBuffer = (yield {
		// eslint-disable-next-line security/detect-non-literal-fs-filename
		async: () => fs.readFile(packageJsonPath),
		// eslint-disable-next-line security/detect-non-literal-fs-filename
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
