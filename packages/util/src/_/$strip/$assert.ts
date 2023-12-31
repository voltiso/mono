// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { VoltisoUtilError } from '_/error'

import { isDefined } from '~/nullish'
import { stringFrom } from '~/string'

export interface $AssertFunction {
	/**
	 * Simple assert implementation.
	 *
	 * 💪 For full-blown schema-assert, use `@voltiso/assertor` instead
	 *
	 * 👗 For a non-stripped version, use `assert` instead
	 *
	 * @strip Use `@voltiso/transform/strip` to strip from production code
	 */
	(condition: unknown, message?: string | undefined): asserts condition

	defined<X>(
		x: X,
		message?: string | undefined,
	): asserts x is X extends undefined ? never : X

	object<X>(
		x: X,
		message?: string | undefined,
	): asserts x is X extends object ? X : never
}

const _assert: $AssertFunction = (condition, message?) => {
	if (condition) return // good

	const finalMessage = message
		? `$assert(${stringFrom(condition)}, '${message}') failed`
		: `$assert(${stringFrom(condition)}) failed`

	throw new VoltisoUtilError(finalMessage)
}

_assert.defined = (...args) => {
	const [x, _message] = args
	if (isDefined(x)) return // good

	throw new VoltisoUtilError('Assertion failed', {
		function: { name: '$assert.defined', arguments: args },
	})
}

_assert.object = (...args) => {
	const [x, _message] = args
	if (typeof x === 'object' && x !== null) return // good

	throw new VoltisoUtilError('Assertion failed', {
		function: { name: '$assert.defined', arguments: args },
	})
}

/**
 * Simple assert implementation.
 *
 * 💪 For full-blown schema-assert, use `@voltiso/assertor` instead
 *
 * 👗 For a non-stripped version, use `assert` instead
 *
 * @strip Use `@voltiso/transform/strip` to strip from production code
 */
export const $fastAssert: typeof _assert = _assert

/**
 * @deprecated Use `$fastAssert` instead
 * @strip Use `@voltiso/transform/strip` to strip from production code
 */
export const $assert = $fastAssert
