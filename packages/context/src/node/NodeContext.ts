// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable sonarjs/arrow-function-convention */
/* eslint-disable es-x/no-class-instance-fields */

import { AsyncLocalStorage } from 'node:async_hooks'

import { fastAssert, isPromiseLike } from '@voltiso/util'

import { NoContextError } from '~/NoContextError'

import type { Context } from '../Context'

/**
 * `Context` implementation for NodeJS
 *
 * @internal use `Context` instead
 */

export class NodeContext<T> implements Context<T> {
	readonly _asyncLocalStorage = new AsyncLocalStorage<T>()
	// readonly _asyncLocalStorage = new (requireAsyncHooks().AsyncLocalStorage)<T>()

	run<Return>(value: T, run: () => Return): Return {
		fastAssert(value !== undefined)

		// const oldValue = this._asyncLocalStorage.getStore()

		let result = this._asyncLocalStorage.run(value, run)

		/** Handle async `run` */
		if (isPromiseLike(result)) {
			// if it was `Promise`, not only `PromiseLike`, we would simply use `.finally()`

			// eslint-disable-next-line promise/prefer-await-to-then
			result = result.then(
				value => {
					// console.log('got', value, 'exit', oldValue)
					// this._asyncLocalStorage.enterWith(oldValue as never) // T | undefined
					return value
				},
				// eslint-disable-next-line promise/prefer-await-to-callbacks
				(error: unknown) => {
					// console.log('err', error, 'exit', oldValue)
					// this._asyncLocalStorage.enterWith(oldValue as never) // T | undefined
					throw error
				},
			) as Return
		}

		return result
	}

	get value(): T {
		const value = this._asyncLocalStorage.getStore()
		if (value === undefined) throw new NoContextError()
		return value
	}

	get hasValue(): boolean {
		return this._asyncLocalStorage.getStore() !== undefined
	}

	get tryGetValue(): T | undefined {
		return this._asyncLocalStorage.getStore()
	}
}
