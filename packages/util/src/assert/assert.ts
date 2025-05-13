// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $fastAssert } from '_'

/**
 * Light-weight runtime assert
 *
 * @throws `Error` on assertion failure
 */
export function fastAssert(
	condition: unknown,
	message?: string | undefined,
): asserts condition {
	if (condition) return

	const finalMessage = message
		? `[@voltiso/util] fastAssert(${condition as string}, '${message}') failed`
		: `[@voltiso/util] fastAssert(${condition as string}) failed`

	const error = new Error(finalMessage)
	$fastAssert(error.stack)
	let stack = error.stack.split('\n')
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	stack = [stack[0]!, ...stack.slice(2)]
	error.stack = stack.join('\n')
	// console.log('error', error)
	throw error
}

/** @deprecated Use `fastAssert` instead */
export const assert = fastAssert
