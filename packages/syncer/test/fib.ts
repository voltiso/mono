/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable no-magic-numbers */
import type { SyncerIterator } from '../src'

export function* fib(n: number): SyncerIterator<number, number> {
	if (n === 0) return 0

	if (n === 1)
		return yield {
			sync: () => 1,
			async: async () => 1,
		}

	const a = yield fib(n - 2)
	const b = yield fib(n - 1)

	return a + b
}
