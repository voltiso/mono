// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import fs from 'node:fs'
import path from 'node:path'

// import { VoltisoUtilError } from '~/error' //! cycle
import type { SyncerPromise, SyncerSwitch } from '~/syncer'
import { runAsync, runSync } from '~/syncer/run'

interface EnoentError {
	code: 'ENOENT'
}

function isEnoentError(error: unknown): error is EnoentError {
	return (error as EnoentError | null)?.code === 'ENOENT'
}

function _access(filePath: string, mode: number): SyncerSwitch<void> {
	return {
		// eslint-disable-next-line n/no-sync
		sync: () => fs.accessSync(filePath, mode),
		async: () => fs.promises.access(filePath, mode),
	}
}

// function* _findPackageJsonUncached(
export function* findPackageJsonSyncer(
	dir?: string | undefined,
): SyncerPromise<string> {
	const startingDir = dir ? path.resolve(dir) : path.resolve()

	let currentDir = startingDir

	let packageJsonPath

	for (;;) {
		// console.log({ currentPath })

		packageJsonPath = path.join(currentDir, 'package.json')

		try {
			yield _access(packageJsonPath, fs.constants.R_OK)
			break
		} catch (error) {
			if (!isEnoentError(error)) throw error
		}

		currentDir = path.dirname(currentDir)

		if (currentDir === '/') {
			throw new Error(
				`[@voltiso/util] findPackageJson(): cannot find package.json in ancestors of ${startingDir}`,
			)
		}
	}

	return packageJsonPath
}

//

// let packageJsonPath: string | undefined
// let packageJsonPathPromise: PromiseLike<string> | undefined

// export function* findPackageJsonSyncer(
// 	dir?: string | undefined,
// ): SyncerPromise<string, string | void> {
// 	if (!packageJsonPath) {
// 		// avoid race condition
// 		if (packageJsonPathPromise)
// 			yield {
// 				async: () => packageJsonPathPromise,
// 			}

// 		// still not loaded?
// 		// note: if async operation is in progress, we force load sync again anyway
// 		if (!packageJsonPath) {
// 			packageJsonPath = (yield {
// 				syncerIterator: _findPackageJsonUncached(dir),

// 				onAsyncStart: (p: PromiseLike<string>) => {
// 					packageJsonPathPromise = p
// 				},
// 			}) as string

// 			packageJsonPathPromise = undef
// 		}
// 	}

// 	return packageJsonPath
// }

//

export function findPackageJson(
	dir?: string | undefined,
): Promise<string | undefined> {
	return runAsync(findPackageJsonSyncer(dir))
}

export function findPackageJsonSync(
	dir?: string | undefined,
): string | undefined {
	return runSync(findPackageJsonSyncer(dir))
}
