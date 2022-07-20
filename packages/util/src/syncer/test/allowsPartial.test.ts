// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { runAsync, runSync } from '../run.js'
import type { SyncerIterator } from '../SyncerIterator.js'

function* partialFunc(): SyncerIterator<number, number | undefined> {
	const x = yield {
		async: () => 11,
	}

	return 100 + (x || 0)
}

describe('allowsPartial', () => {
	it('sync', () => {
		expect.hasAssertions()

		const r = runSync(partialFunc())

		expect(r).toBe(100)
	})

	it('async', async () => {
		expect.hasAssertions()

		const r = await runAsync(partialFunc())

		expect(r).toBe(111)
	})

	it('type - does not allow partial if Intermediate cannot be undefined', () => {
		expect.assertions(0)

		void function* (): SyncerIterator<number, number> {
			// @ts-expect-error partial!
			const x = yield {
				async: () => 11,
			}

			return 100 + (x || 0)
		}
	})
})
