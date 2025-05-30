// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { haveAsyncHooks } from './node/asyncHooks'
import { NodeContext } from './node/NodeContext'
import { ZoneContext } from './zone/ZoneContext'

/**
 * Wrapper for either `AsyncLocalStorage` from `node:async_hooks`, or `zone.js`
 * for non-Node environments
 *
 * - Note: ⚠️ `undefined` is not a valid context value!
 */
export interface Context<T> {
	run<Return>(value: T, run: () => Return): Return

	get value(): T
	get hasValue(): boolean
	get tryGetValue(): T | undefined
}

export interface ContextConstructor {
	new <T>(): Context<T>
}

//

function log(..._messages: unknown[]) {
	return // ! logging disabled

	// // eslint-disable-next-line es-x/no-global-this
	// if (typeof globalThis !== 'undefined') return

	// // eslint-disable-next-line n/no-process-env, turbo/no-undeclared-env-vars
	// const nodeEnv = process.env['NODE_ENV'] as
	// 	| 'production'
	// 	| 'development'
	// 	| 'test'

	// if (nodeEnv == 'test') return

	// // eslint-disable-next-line no-console
	// console.warn(...messages)
}

//

function getContextConstructor(): ContextConstructor {
	if (haveAsyncHooks()) {
		log(
			'[@voltiso/context] ✅ Using NodeContext (`AsyncLocalStorage`) - do not patch the global `Promise`',
		)

		return NodeContext
	}

	log(
		'[@voltiso/context] ⚠️ Using ZoneContext (`zone.js`) - make sure `zone.js` is imported after any other global `Promise` object manipulation, and transpile all code to not include `async`/`await` syntax (ES2016 or earlier)',
	)

	return ZoneContext
}

export const Context: ContextConstructor = getContextConstructor()
