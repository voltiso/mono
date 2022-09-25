// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { createTransactor } from './common'

const db = createTransactor({ requireSchemas: false })

describe('intrinsic fields', () => {
	it('returns null __voltiso for non-existing documents', async () => {
		expect.hasAssertions()

		await expect(
			db('someDinosaurCollection', 'someNonExistingDoc').__voltiso,
		).rejects.toThrow(
			'someDinosaurCollection/someNonExistingDoc.__voltiso does not exist',
		)
	})
})
