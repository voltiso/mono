// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable n/no-sync */

import { $Assert } from '_'

import { runAsync, runSync } from '~/syncer/run'
import type { SyncerFunction } from '~/syncer/SyncerFunction'
import type { SyncerPromise } from '~/syncer/SyncerPromise'
import type { IsIdentical } from '~/type'

function* fib(n: number): SyncerPromise<number, number> {
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

		$Assert<IsIdentical<typeof fib, SyncerFunction<[number], number, number>>>()
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
