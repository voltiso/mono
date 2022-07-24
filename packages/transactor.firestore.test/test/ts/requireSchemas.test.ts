// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { createTransactor, IndexedDoc } from '@voltiso/transactor'

import { firestore, firestoreModule } from './common/firestore.js'

const db = createTransactor(firestore, firestoreModule, {
	requireSchemas: false,
})
const dbWithSchema = createTransactor(firestore, firestoreModule, {
	requireSchemas: true,
})

const tigers = db('foo').register(IndexedDoc)
const tigersWithSchema = dbWithSchema('foo').register(IndexedDoc)

describe('requireSchemas', function () {
	it('should respect constructor argument (false)', async function () {
		expect.hasAssertions()

		const foo = await tigers.add({ claw: 123 })
		await tigers('ggggg').set({ head: 234 })

		await expect(tigers(foo.id).data).resolves.toMatchObject({ claw: 123 })
		await expect(tigers('ggggg').dataWithId()).resolves.toMatchObject({
			id: 'ggggg',
			head: 234,
		})
	})

	it('should respect constructor argument (true)', async function () {
		expect.hasAssertions()
		await expect(tigersWithSchema.add({ claw: 123 })).rejects.toThrow(
			'missing schema',
		)
		await expect(tigersWithSchema('ggggg').set({ head: 234 })).rejects.toThrow(
			'missing schema',
		)
	})

	it('should respect dynamically changed requireSchema (to false)', async function () {
		expect.hasAssertions()

		dbWithSchema.requireSchemas = false
		const doc = await tigersWithSchema.add({ claw: 123 })
		await tigersWithSchema('ggggg').set({ head: 234 })

		await expect(tigersWithSchema(doc.id).dataWithId()).resolves.toMatchObject({
			id: doc.id,
			claw: 123,
		})
		await expect(tigersWithSchema('ggggg').data).resolves.toMatchObject({
			head: 234,
		})

		dbWithSchema.requireSchemas = true
	})

	it('should respect dynamically changed requireSchema (to true)', async function () {
		expect.hasAssertions()

		db.requireSchemas = true

		await expect(tigers.add({ claw: 123 })).rejects.toThrow('missing schema')
		await expect(tigers('ggggg').set({ head: 234 })).rejects.toThrow(
			'missing schema',
		)

		db.requireSchemas = false
	})
})
