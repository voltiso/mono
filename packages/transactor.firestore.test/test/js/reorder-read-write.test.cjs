// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

'use strict'

const { incrementIt } = require('@voltiso/transactor')
const { firestore, srcFirestore } = require('./common/index.cjs')

const { createFirestoreTransactor } = srcFirestore

const db = createFirestoreTransactor(firestore, { requireSchemas: false })

describe('reorder-read-write', function () {
	it('should reorder', async function () {
		expect.hasAssertions()

		await firestore.doc('languages/english').set({ popularity: 1 })

		await db.runTransaction(async t => {
			for (let i = 0; i < 10; ++i) {
				const english = await t('languages/english')
				await t('languages/english').update({
					// @ts-expect-error ...
					popularity: english.popularity * 2,
				})
			}
		})

		await expect(db('languages/english').dataWithId()).resolves.toMatchObject({
			id: 'english',
			popularity: 1024,
		})
	})

	it('should support chained increment', async function () {
		expect.hasAssertions()

		await db('entity/a').set({ val: 1 })
		await db.runTransaction(async t => {
			await t('entity/a').update({ val: incrementIt(10) })
			await t('entity/a').update({ val: incrementIt(100) })

			await expect(t('entity/a').dataWithId()).resolves.toMatchObject({
				id: 'a',
				val: 111,
			})
		})
	})
})
