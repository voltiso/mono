// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
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

const _fastAssert: $AssertFunction = (condition, message?) => {
	if (condition) return // good

	const finalMessage = message
		? `$fastAssert(${stringFrom(condition)}, '${message}') failed`
		: `$fastAssert(${stringFrom(condition)}) failed`

	throw new VoltisoUtilError(finalMessage)
}

_fastAssert.defined = (...args) => {
	const [x, _message] = args
	if (isDefined(x)) return // good

	throw new VoltisoUtilError('Assertion failed', {
		function: { name: '$fastAssert.defined', arguments: args },
	})
}

_fastAssert.object = (...args) => {
	const [x, _message] = args
	if (typeof x === 'object' && x !== null) return // good

	throw new VoltisoUtilError('Assertion failed', {
		function: { name: '$fastAssert.defined', arguments: args },
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
export const $fastAssert: typeof _fastAssert = _fastAssert

/**
 * @deprecated Use `$fastAssert` instead
 * @strip Use `@voltiso/transform/strip` to strip from production code
 */
export const $assert = $fastAssert
