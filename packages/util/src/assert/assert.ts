// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '_'

/**
 * Light-weight runtime assert
 *
 * @throws `Error` on assertion failure
 */
export function assert(
	condition: unknown,
	message?: string | undefined,
): asserts condition {
	if (condition) return

	const finalMessage = message
		? `[@voltiso/util] assert(${condition as string}, '${message}') failed`
		: `[@voltiso/util] assert(${condition as string}) failed`

	const error = new Error(finalMessage)
	$assert(error.stack)
	let stack = error.stack.split('\n')
	stack = [stack[0] as string, ...stack.slice(2)]
	error.stack = stack.join('\n')
	// console.log('error', error)
	throw error
}
