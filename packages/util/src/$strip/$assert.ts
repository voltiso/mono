// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { VoltisoUtilError } from '~/error'
import { isDefined } from '~/nullish'
import { stringFrom } from '~/string'

export interface $AssertFunction {
	(condition: unknown, message?: string | undefined): asserts condition

	defined<X>(
		x: X,
		message?: string | undefined,
	): asserts x is X extends undefined ? never : X
}

/** @strip */
export const $assert: $AssertFunction = (condition, message?) => {
	if (condition) return // good

	const finalMessage = message
		? `$assert(${stringFrom(condition)}, '${message}') failed`
		: `$assert(${stringFrom(condition)}) failed`

	throw new VoltisoUtilError(finalMessage)
}

/** @strip */
$assert.defined = (...args) => {
	const [x, _message] = args
	if (isDefined(x)) return // good

	throw new VoltisoUtilError('Assertion failed', {
		function: { name: '$assert.defined', arguments: args },
	})
}
