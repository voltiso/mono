// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { VoltisoUtilError } from '_/error'

import type { StackTraceEntry } from '~/stack-trace'
import { parseStackTrace } from '~/stack-trace'

/** @internal */
export function _findFirstDollarEntry(
	stack: StackTraceEntry[],
): StackTraceEntry | undefined {
	for (const entry of stack)
		if (entry.functionName.startsWith('$')) return entry

	return undefined
}

export function assertDev(): void {
	// eslint-disable-next-line turbo/no-undeclared-env-vars, n/no-process-env
	if (process.env['NODE_ENV'] !== 'production') return

	// eslint-disable-next-line unicorn/error-message, @typescript-eslint/no-non-null-assertion
	const stackStr = new Error().stack!
	const stack = parseStackTrace(stackStr)

	const entry = _findFirstDollarEntry(stack)

	const functionInfo = entry
		? { name: entry.functionName }
		: { name: 'assertDev', arguments: [] as string[] }

	const message = entry
		? `assertDev() failed - function ${entry.functionName} not pruned in production code - check '@voltiso/transform/strip' configuration`
		: 'Assertion failed - not in DEV mode - no `jest` environment present'

	throw new VoltisoUtilError(message, {
		function: functionInfo,
	})
}
