// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { VoltisoUtilError } from '~'
import type { StackTraceEntry } from '~/stack-trace/parseStackTrace'
import { parseStackTrace } from '~/stack-trace/parseStackTrace'

/** @internal */
export function _findFirstDollarEntry(
	stack: StackTraceEntry[],
): StackTraceEntry | undefined {
	for (const entry of stack)
		if (entry.functionName.startsWith('$')) return entry

	return undefined
}

export function assertDev(): void {
	// eslint-disable-next-line n/no-process-env
	if (process.env['NODE_ENV'] !== 'test' && typeof expect === 'undefined') {
		// eslint-disable-next-line unicorn/error-message
		const stackStr = new Error().stack as string
		const stack = parseStackTrace(stackStr)

		// eslint-disable-next-line etc/no-internal
		const entry = _findFirstDollarEntry(stack)

		const functionInfo = entry
			? { name: entry.functionName }
			: { name: 'assertDev', arguments: [] }

		const message = entry
			? `assertDev() failed - function ${entry.functionName} not pruned in production code - check '@voltiso/transform/comment-out' configuration`
			: 'Assertion failed - not in DEV mode - no `jest` environment present'

		throw new VoltisoUtilError(message, {
			function: functionInfo,
		})
	}
}
