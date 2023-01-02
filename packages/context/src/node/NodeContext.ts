// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert, isPromiseLike } from '@voltiso/util'

import { NoContextError } from '~/NoContextError'

import type { Context } from '../Context'

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
export type AsyncHooksModule = typeof import('async_hooks')

let _asyncHooks: AsyncHooksModule | undefined

function requireAsyncHooks(): AsyncHooksModule {
	if (!_asyncHooks) {
		try {
			// eslint-disable-next-line n/global-require, unicorn/prefer-module
			_asyncHooks = require('node:async_hooks') as AsyncHooksModule
		} catch {
			throw new Error(
				`@voltiso/context: NodeContext requires 'node:async_hooks' module, which is not available in this NodeJS version. Please use 'ZoneContext' instead.`,
			)
		}
	}

	return _asyncHooks
}

/**
 * `Context` implementation for NodeJS
 *
 * @internal use `Context` instead
 */
// eslint-disable-next-line etc/underscore-internal
export class NodeContext<T> implements Context<T> {
	readonly _asyncLocalStorage = new (requireAsyncHooks().AsyncLocalStorage)<T>()

	run<Return>(value: T, run: () => Return): Return {
		assert(value !== undefined)

		const oldValue = this._asyncLocalStorage.getStore()

		let result = this._asyncLocalStorage.run(value, run)

		/** Handle async `run` */
		if (isPromiseLike(result)) {
			// if it was `Promise`, not only `PromiseLike`, we would simply use `.finally()`

			// eslint-disable-next-line promise/prefer-await-to-then
			result = result.then(
				value => {
					this._asyncLocalStorage.enterWith(oldValue as never) // T | undefined
					return value
				},
				// eslint-disable-next-line promise/prefer-await-to-callbacks
				error => {
					this._asyncLocalStorage.enterWith(oldValue as never) // T | undefined
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
}
