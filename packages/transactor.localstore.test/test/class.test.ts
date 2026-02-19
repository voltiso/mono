// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/ban-ts-comment */
import { describe, expect, it } from '@jest/globals'
import * as s from '@voltiso/schemar'
import type { TriggerParams } from '@voltiso/transactor'
import {
	afterCreateOrUpdate,
	Doc,
	IndexedDoc,
	method,
} from '@voltiso/transactor'
import { arraySetAddToIt, deleteItIfPresent } from '@voltiso/util'

import { createTransactor, database } from './common'

const db = createTransactor({ onUnknownField: 'error' })

class Doctor extends Doc.with({
	id: s.string,

	public: {
		languages: s.array(s.string).optional,
	},

	private: {
		specialty: s.string.optional,
		ofWhat: s.string.optional,
	},
}) {
	@method
	async setSpecialty(specialty: string) {
		this.data.specialty = specialty
	}

	@afterCreateOrUpdate
	setOfWhat(_p: TriggerParams.AfterCreateOrUpdate<Doctor>) {
		if (this.data.specialty === 'master') this.data.ofWhat = 'universe'
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

		await things(doc.id).data // !!!

		await expect(things(doc.id).data).resolves.toMatchObject({ thingA: 123 })
		await expect(things('ggggg').dataWithId()).resolves.toMatchObject({
			id: 'ggggg',
			thingB: 234,
		})
	})

	it('should allow IndexedDoc even if requireSchemas === true', async function () {
		expect.hasAssertions()

		db.requireSchemas = true

		await expect(things.add({ thingA: 123 })).resolves.toBeTruthy()

		await expect(things('ggggg').set({ thingB: 234 })).resolves.toBeTruthy()
	})

	it('should allow private fields access via method', async function () {
		expect.hasAssertions()

		await doctors('a').set({})
		await doctors('a').methods.setSpecialty('magician')
		const doc = await doctors('a')

		expect(doc?.data).toMatchObject({
			// id: 'a',
			specialty: 'magician',
		})
	})

	it('should allow private fields access via triggers', async function () {
		expect.hasAssertions()

		await doctors('a').set({})
		await doctors('a').methods.setSpecialty('master')
		const doc = await doctors('a')

		expect(doc?.dataWithoutId()).toMatchObject({
			specialty: 'master',
			ofWhat: 'universe',
		})
	})

	it('should allow modifying private fields from the same doc', async function () {
		expect.hasAssertions()

		await doctors('a').set({})

		await expect(doctors('a').methods.good()).resolves.toBeTruthy()
		await expect(doctors('a').data.specialty).resolves.toBe('fireman')
	})

	it('should support sentinels', async () => {
		expect.hasAssertions()

		await doctors('a').set({})

		await doctors('a').update({ languages: deleteItIfPresent })
		await doctors('a').update({ languages: arraySetAddToIt('a', 'b') })
		await doctors('a').update({ languages: arraySetAddToIt('b', 'c') })

		await expect(doctors('a').data).resolves.toMatchObject({
			languages: ['a', 'b', 'c'],
		})
	})
})
