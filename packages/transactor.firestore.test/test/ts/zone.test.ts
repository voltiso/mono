// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { createTransactor } from '@voltiso/transactor'

import { firestore, firestoreModule } from './common/firestore'

const db = createTransactor(firestore, firestoreModule, {
	requireSchemas: false,
})

describe('transaction', function () {
	it('should use async storage (get)', async function () {
		expect.hasAssertions()

		await db.runTransaction(async t => {
			expect(Zone.current.name).toBe('Transaction')

			await t('visitorK/artur')

			expect(Zone.current.name).toBe('Transaction')

			await t('visitorK/artur').set({ age: 934 })

			expect(Zone.current.name).toBe('Transaction')
			await expect(db('visitorK/artur')['age']).resolves.toBe(934)
		})

		expect(Zone.current.name).not.toBe('Transaction')
	})
})
