// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { createTransactor } from './common'

const db = createTransactor({ requireSchemas: false })

describe('intrinsic fields', () => {
	it('returns default __voltiso for non-existing documents (inside transaction)', async () => {
		expect.hasAssertions()

		const path = ['someDinosaurCollection', 'someNonExistingDoc'] as const

		await db.runTransaction(async () => {
			const docRef = db(...path)
			await docRef.get()

			await expect(db(...path).__voltiso).resolves.toMatchObject({
				numRefs: 0,
			})
		})
	})
})