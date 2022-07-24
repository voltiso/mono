// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as s from '@voltiso/schemar'
import type { Doc } from '@voltiso/transactor'
import { createTransactor } from '@voltiso/transactor'

import { firestore, firestoreModule } from '../common/firestore.js'

const db = createTransactor(firestore, firestoreModule, {
	requireSchemas: false,
})

// eslint-disable-next-line jest/require-hook
db('alien/*')
	.protected({
		specialty: s.string.optional,
		ofWhat: s.string.optional,
	})
	.method('setSpecialty', function (specialty: string) {
		this['specialty'] = specialty
	})
	.afterCreateOrUpdate(function () {
		// @ts-ignore
		if (this.specialty === 'master') this.ofWhat = 'universe'
	})
	.method('ok', async function (this: Doc) {
		const { path } = this
		await db(path).update({ specialty: 'fireman' })
	})

describe('raw-protected', function () {
	it('should not allow setting protected fields', async function () {
		expect.hasAssertions()

		await firestore.doc('alien/anthony').delete()

		await expect(
			db('alien', 'anthony').set({ specialty: 'neurosurgery' }),
		).rejects.toThrow('specialty')

		await expect(db('alien/anthony')).resolves.toBeNull()
	})

	it('should assume empty schema if protectedSchema is provided', async function () {
		expect.hasAssertions()

		await firestore.doc('alien/anthony').delete()

		await expect(
			db('alien', 'anthony').set({ illegalField: 123 }),
		).rejects.toThrow('illegalField')

		await expect(db('alien/anthony')).resolves.toBeNull()
	})

	it('should allow any data for tables without schemas', async function () {
		expect.hasAssertions()

		db.requireSchemas = false
		const doc = await db('magicEntity').add({ magicEntity2: 123 })
		await db('magicEntity/ggggg').set({ notSoMagical: 234 })

		await expect(db('magicEntity', doc.id).dataWithId()).resolves.toMatchObject(
			{ id: doc.id, magicEntity2: 123 },
		)
		expect((await db('magicEntity', 'ggggg'))!.dataWithId()).toMatchObject({
			id: 'ggggg',
			notSoMagical: 234,
		})
	})

	it('should not allow any data for tables without schemas if requireSchemas === true', async function () {
		expect.hasAssertions()

		db.requireSchemas = true

		await expect(db('magicEntity').add({ magicEntity2: 123 })).rejects.toThrow(
			'missing schema',
		)
		await expect(
			db('magicEntity/ggggg').set({ notSoMagical: 234 }),
		).rejects.toThrow('missing schema')

		db.requireSchemas = false
	})

	it('should allow protected fields access via actions', async function () {
		expect.hasAssertions()

		await db('alien/a').set({})
		await db('alien/a').methods['setSpecialty']!('magician')
		const doc = await db('alien/a')

		expect(doc!.dataWithId()).toMatchObject({
			id: 'a',
			specialty: 'magician',
		})
	})

	it('should allow protected fields access via triggers', async function () {
		expect.hasAssertions()

		await db('alien/a').set({})
		// @ts-ignore

		await db('alien/a')['setSpecialty']('master')
		const doc = await db('alien/a')

		expect(doc!.dataWithoutId()).toMatchObject({
			specialty: 'master',
			ofWhat: 'universe',
		})
	})

	it('should allow modifying protected fields from other documents', async function () {
		expect.hasAssertions()

		await db('alien/a').set({})
		await db('alien/a').methods['ok']!()

		await expect(db('alien/a')['specialty']).resolves.toBe('fireman')
	})
})
