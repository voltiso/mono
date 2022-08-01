// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// import { assert } from '~/_internal/assert' //! cyclic dep
import type { SyncerPromise } from '~/syncer'
import { runAsync, runSync } from '~/syncer'

import { findAndReadPackageJsonSyncer } from './findAndReadPackageJson'
import type { PackageJson } from './PackageJson'

const cache = new Map<string, PackageJson>()
const promises = new Map<string, PromiseLike<PackageJson>>()

export function* getPackageJsonCachedSyncer(
	dir: string,
): SyncerPromise<PackageJson, PackageJson | undefined> {
	let result = cache.get(dir)

	if (result) return result

	const promise = promises.get(dir)

	if (promise) {
		result = yield {
			async: () => promise,
		}
	}

	if (result) return result

	/**
	 * Note: if async operation is already in progress, but here we have a sync
	 * call, we will load `package.json` anyway for the second time
	 */

	result = yield {
		syncerIterator: findAndReadPackageJsonSyncer(dir),

		onAsyncStart: (promise: PromiseLike<PackageJson>) => {
			promises.set(dir, promise)
		},
	}

	// assert(result)
	if (!result) throw new Error('[@voltiso/util] getPackageJson() failed')

	promises.delete(dir)
	cache.set(dir, result)

	return result
}

//

export function getPackageJsonCached(dir: string) {
	return runAsync(getPackageJsonCachedSyncer(dir))
}

export function getPackageJsonCachedSync(dir: string) {
	return runSync(getPackageJsonCachedSyncer(dir))
}
