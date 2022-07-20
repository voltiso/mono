// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable no-await-in-loop */
import { isIterable } from '../array'
import { lazyPromise } from '../lazy'
import type { SyncerIterator } from './SyncerIterator.js'
import { isSyncerNested } from './SyncerNested.js'
import { isSyncerSwitchAsync, isSyncerSwitchSync } from './SyncerSwitch.js'

function isDone<T, TReturn>(
	iteratorResult: IteratorResult<T, TReturn>,
): iteratorResult is IteratorReturnResult<TReturn> {
	return Boolean(iteratorResult.done)
}

//

//

export async function runAsync<Return, Intermediate>(
	iterator: SyncerIterator<Return, Intermediate>,
): Promise<Return> {
	let currentResult = iterator.next()

	while (!isDone(currentResult)) {
		const generated = currentResult.value

		try {
			let next

			if (isIterable(generated)) {
				next = await runAsync(generated)
			} else if (isSyncerNested(generated)) {
				if (generated.onAsyncStart) {
					const promise = lazyPromise(() => runAsync(generated.syncerIterator))
					await generated.onAsyncStart(promise)
					next = await promise
				}
			} else if (isSyncerSwitchAsync(generated)) {
				next = await generated.async()
			}

			currentResult = iterator.next(next as Awaited<Intermediate>) // can be undefined
		} catch (error) {
			currentResult = iterator.throw(error)
		}
	}

	return currentResult.value
}

//

//

export function runSync<Return, Intermediate>(
	iterator: SyncerIterator<Return, Intermediate>,
): Return {
	let currentResult = iterator.next()

	while (!isDone(currentResult)) {
		const generated = currentResult.value

		try {
			let next

			if (isIterable(generated)) {
				next = runSync(generated)
			} else if (isSyncerNested(generated)) {
				next = runSync(generated.syncerIterator)
			} else if (isSyncerSwitchSync(generated)) {
				next = generated.sync()
			}

			currentResult = iterator.next(next as Awaited<Intermediate>) // can be undefined
		} catch (error) {
			currentResult = iterator.throw(error)
		}
	}

	return currentResult.value
}
