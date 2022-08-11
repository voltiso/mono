// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// eslint-disable-next-line n/no-process-env
if (process.env['NODE_ENV'] !== 'test' && typeof expect === 'undefined')
	throw new Error(
		'[@voltiso/assertor] included without `jest` environment (assert pruning in production did not work?) - NODE_ENV should be `test` or `expect` should be defined',
	)

export { strict as $assert } from 'node:assert'

// export function $assert(
// 	value: unknown,
// 	message?: string | Error,
// ): asserts value {
// 	return nodeStrictAssert(value, message)
// }

//

//

// import type { strict } from 'node:assert'

// let cachedStrictAssert: undefined | null | typeof strict

// export function assert(
// 	value: unknown,
// 	message?: string | Error,
// ): asserts value {
// 	if (cachedStrictAssert === null) return

// 	if (!cachedStrictAssert) {
// 		try {
// 			// eslint-disable-next-line n/global-require, unicorn/prefer-module, unicorn/prefer-node-protocol, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
// 			cachedStrictAssert = require('assert').strict
// 		} catch {
// 			cachedStrictAssert = null
// 		}
// 	}

// 	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
// 	if (cachedStrictAssert) (cachedStrictAssert as any)(value, message)
// }
