// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { createTransactor, database } from './common'

const db = createTransactor({ requireSchemas: false })

describe('data', () => {
	it('docRef.data returns no id', async () => {
		expect.hasAssertions()

		await database.doc('testData/a').set({ a: 1 })

		await expect(db('testData/a').data).resolves.toStrictEqual({ a: 1 })
	})
})
