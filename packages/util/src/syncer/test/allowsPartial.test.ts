// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable n/no-sync */

import { describe, expect, it } from '@jest/globals'

import type { SyncerPromise } from '~/syncer'
import { runAsync, runSync } from '~/syncer'

function* partialFunc(): SyncerPromise<number, number | undefined> {
	const x = yield {
		async: () => 11,
	}

	return 100 + (x ?? 0)
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

		void function* (): SyncerPromise<number, number> {
			// @ts-expect-error partial!
			const x = yield {
				async: () => 11,
			}

			return 100 + (x || 0)
		}
	})
})
