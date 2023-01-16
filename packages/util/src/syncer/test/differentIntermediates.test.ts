// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'

import type { SyncerFunction, SyncerPromise } from '~/syncer'
import { runAsync, runSync } from '~/syncer'
import type { IsIdentical } from '~/type'

function* differentIntermediates(
	s: string,
	n: number,
): SyncerPromise<number, string | number> {
	const s2 = (yield {
		sync: () => 'test',
		async: async () => 'test',
	}) as string

	const n2 = (yield {
		sync: () => 33,
		async: async () => 33,
	}) as number

	return n + n2 + s.length + s2.length
}

describe('differentIntermediates', () => {
	it('type', () => {
		expect.assertions(0)

		$Assert<
			IsIdentical<
				typeof differentIntermediates,
				SyncerFunction<[string, number], number, string | number>
			>
		>()
	})

	it('sync', () => {
		expect.hasAssertions()

		const r = runSync(differentIntermediates('my', 5))

		expect(r).toBe(44)
	})

	it('async', async () => {
		expect.hasAssertions()

		const r = await runAsync(differentIntermediates('my', 5))

		expect(r).toBe(44)
	})
})
