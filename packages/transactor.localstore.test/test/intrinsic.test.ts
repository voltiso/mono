// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'

import { createTransactor } from './common'

const db = createTransactor({ requireSchemas: false, checkDecorators: false })

describe('intrinsic fields', () => {
	it('returns default __voltiso for non-existing documents (inside transaction)', async () => {
		expect.hasAssertions()

		const path = ['someDinosaurCollection', 'someNonExistingDoc'] as const

		await db.runTransaction(async () => {
			const docRef = db(...path)
			await docRef.get()

			const docRef2 = db(...path)

			await expect(docRef2.__voltiso).resolves.toMatchObject({
				numRefs: 0,
			})
		})
	})

	it('does not allow `set` with __voltiso', async () => {
		await db('tvBody', 'a').set({
			test: 1,

			__voltiso: {
				numRefs: 100,
			},
		})

		await expect(db('tvBody', 'a').data).resolves.toMatchObject({
			__voltiso: {
				numRefs: 0,
			},
		})
	})
})
