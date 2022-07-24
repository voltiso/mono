// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as s from '@voltiso/schemar'
import type { TriggerParams } from '@voltiso/transactor'
import {
	afterCreateOrUpdate,
	Doc,
	IndexedDoc,
	method,
} from '@voltiso/transactor'

import { createTransactor, database } from './common'

const db = createTransactor()

class Doctor extends Doc.fields({
	private: {
		specialty: s.string.optional,
		ofWhat: s.string.optional,
	},
}) {
	@method
	async setSpecialty(specialty: string) {
		this.specialty = specialty
	}

	@afterCreateOrUpdate
	setOfWhat(_p: TriggerParams.AfterCreateOrUpdate<Doctor>) {
		if (this.specialty === 'master') this.ofWhat = 'universe'
	}

	@method
	async good() {
		// @ts-expect-error
		await doctors(this.id).update({ specialty: 'fireman' })
		return true
	}
}

const doctors = db('doctor').register(Doctor)
const things = db('thing').register(IndexedDoc)

describe('class', () => {
	it('should not allow setting private fields', async function () {
		expect.hasAssertions()

		await database.doc('doctor/anthony').delete()

		await expect(
			// @ts-expect-error specialty is private
			doctors('anthony').set({ specialty: 'neurosurgery' }),
		).rejects.toThrow('specialty')
		await expect(doctors('anthony')).resolves.toBeNull()
	})

	it('should assume empty schema if privateSchema is provided', async function () {
		expect.hasAssertions()
		// @ts-expect-error illegalField does not exist
		await expect(doctors('anthony').set({ illegalField: 123 })).rejects.toThrow(
			'illegalField',
		)
		await expect(doctors('anthony')).resolves.toBeNull()
	})

	it('should allow any data for tables without schemas', async function () {
		expect.hasAssertions()

		db.requireSchemas = false
		const doc = await things.add({ thingA: 123 })
		await things('ggggg').set({ thingB: 234 })

		await expect(things(doc.id).data).resolves.toMatchObject({ thingA: 123 })
		await expect(things('ggggg').dataWithId()).resolves.toMatchObject({
			id: 'ggggg',
			thingB: 234,
		})
	})

	it('should not allow any data for tables without schemas if requireSchemas === true', async function () {
		expect.hasAssertions()

		db.requireSchemas = true

		await expect(things.add({ thingA: 123 })).rejects.toThrow('missing schema')
		await expect(things('ggggg').set({ thingB: 234 })).rejects.toThrow(
			'missing schema',
		)
	})

	it('should allow private fields access via method', async function () {
		expect.hasAssertions()

		await doctors('a').set({})
		await doctors('a').setSpecialty('magician')
		const doc = await doctors('a')

		expect(doc?.data).toMatchObject({
			// id: 'a',
			specialty: 'magician',
		})
	})

	it('should allow private fields access via triggers', async function () {
		expect.hasAssertions()

		await doctors('a').set({})
		await doctors('a').setSpecialty('master')
		const doc = await doctors('a')

		expect(doc?.dataWithoutId()).toMatchObject({
			specialty: 'master',
			ofWhat: 'universe',
		})
	})

	it('should allow modifying private fields from the same doc', async function () {
		expect.hasAssertions()

		await doctors('a').set({})

		await expect(doctors('a').good()).resolves.toBeTruthy()
		await expect(doctors('a').specialty).resolves.toBe('fireman')
	})
})
