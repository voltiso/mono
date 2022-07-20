// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '../../type'
import { Assert } from '../../type'
import { runAsync, runSync } from '../run.js'
import type { SyncerFunction } from '../SyncerFunction.js'
import type { SyncerIterator } from '../SyncerIterator.js'

function* fib(n: number): SyncerIterator<number, number> {
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

describe('fib', () => {
	it('type', () => {
		expect.assertions(0)

		Assert<IsIdentical<typeof fib, SyncerFunction<[number], number, number>>>()
	})

	it('sync', () => {
		expect.hasAssertions()

		expect(runSync(fib(10))).toBe(55)
	})

	it('async', async () => {
		expect.hasAssertions()

		await expect(runAsync(fib(10))).resolves.toBe(55)
	})
})
