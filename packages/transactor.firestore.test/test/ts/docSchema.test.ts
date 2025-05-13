// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import * as s from '@voltiso/schemar'
import { Doc, Transactor } from '@voltiso/transactor'

import { firestore, firestoreModule } from './common'

const db = new Transactor(firestore, firestoreModule, {
	checkDecorators: false,
})

class Doctor extends Doc.with({
	id: s.string,

	public: {
		specialty: s.string.optional,
	},

	private: {
		secret: s.string,
	},
}) {}

// const doctors = db('doctor').register(Doctor)

class Patient extends Doc.with({
	id: s.string,

	public: {
		doctor: Doctor.schemaWithId.optional,
	},
}) {}

const patients = db('patient').register(Patient)

describe('docSchema', function () {
	it('should validate schema', async function () {
		expect.hasAssertions()

		await firestore.doc('patient/a').delete()

		await expect(
			// @ts-expect-error `secret`: wrong type
			patients('a').set({ doctor: { id: 'aaa', secret: 123 } }),
		).rejects.toThrow('secret')
		await expect(patients('a')).resolves.toBeNull()

		// @ts-expect-error `secret` missing
		await expect(patients('a').set({ doctor: { id: 'aaa' } })).rejects.toThrow(
			'secret',
		)
		await expect(patients('a')).resolves.toBeNull()

		await patients('a').set({ doctor: { id: 'aaa', secret: 'asd' } })

		await expect(patients('a').data).resolves.toMatchObject({
			doctor: { id: 'aaa', secret: 'asd' },
		})
	})
})
