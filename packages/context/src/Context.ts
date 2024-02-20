// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
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
	// eslint-disable-next-line @typescript-eslint/method-signature-style
	run<Return>(value: T, run: () => Return): Return

	get value(): T
	get hasValue(): boolean
	get tryGetValue(): T | undefined
}

export interface ContextConstructor {
	// eslint-disable-next-line @typescript-eslint/prefer-function-type
	new <T>(): Context<T>
}

//

function log(...messages: unknown[]) {
	if (typeof window !== 'undefined') return

	// eslint-disable-next-line n/no-process-env, turbo/no-undeclared-env-vars
	const nodeEnv = process.env['NODE_ENV'] as
		| 'production'
		| 'development'
		| 'test'

	if (nodeEnv === 'test') return

	// eslint-disable-next-line no-console
	console.warn(...messages)
}

//

function getContextConstructor(): ContextConstructor {
	if (haveAsyncHooks()) {
		log(
			'[@voltiso/context] ✅ Using NodeContext (`AsyncLocalStorage`) - do not patch the global `Promise`',
		)
		// eslint-disable-next-line etc/no-internal
		return NodeContext
	}

	log(
		'[@voltiso/context] ⚠️ Using ZoneContext (`zone.js`) - make sure `zone.js` is imported after any other global `Promise` object manipulation, and transpile all code to not include `async`/`await` syntax (ES2016 or earlier)',
	)
	// eslint-disable-next-line etc/no-internal
	return ZoneContext
}

export const Context: ContextConstructor = getContextConstructor()
