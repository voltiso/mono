// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import {
	runAsync,
	runSync,
	SyncerIterator,
	SyncerSwitch,
} from '@voltiso/syncer/util/src/syncer/index.js'
import fs from 'node:fs'
import path from 'node:path'

import { VoltisoScriptError } from '../VoltisoScriptError.js'

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

function* _findPackageJsonUncached(): SyncerIterator<string> {
	let currentPath = path.resolve()

	let packageJsonPath

	for (;;) {
		// console.log({ currentPath })

		packageJsonPath = path.join(currentPath, 'package.json')

		try {
			yield _access(packageJsonPath, fs.constants.R_OK)
			break
		} catch (error) {
			if (!isEnoentError(error)) throw error
		}

		currentPath = path.dirname(currentPath)

		if (currentPath === '/') {
			throw new VoltisoScriptError(
				`cannot find package.json in ancestors of ${path.resolve()}`,
			)
		}
	}

	return packageJsonPath
}

//

let packageJsonPath: string | undefined
let packageJsonPathPromise: Promise<void> | undefined

function* _findPackageJson(): SyncerIterator<string, string | void> {
	if (!packageJsonPath) {
		// avoid race condition
		if (packageJsonPathPromise)
			yield {
				async: () => packageJsonPathPromise,
			}

		// still not loaded?
		// note: if async operation is in progress, we force load sync again anyway
		if (!packageJsonPath) {
			packageJsonPath = (yield {
				syncerIterator: _findPackageJsonUncached(),

				onAsyncStart: p => {
					packageJsonPathPromise = p
				},
			}) as string

			packageJsonPathPromise = undefined
		}
	}

	return packageJsonPath
}

//

export function findPackageJson(): Promise<string | undefined> {
	return runAsync(_findPackageJson())
}

export function findPackageJsonSync(): string | undefined {
	return runSync(_findPackageJson())
}
