// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import { Doc } from '@voltiso/transactor'

import { createTransactor, database } from './common'

const db = createTransactor()

class Doctor extends Doc({
	public: {
		specialty: s.string.optional,
	},

	private: {
		secret: s.string,
	},
}) {}

class Patient extends Doc.public({
	doctor: Doctor.schemaWithId.optional,
}) {}

const patients = db('patient').register(Patient)

describe('docSchema', () => {
	it('should validate schema', async () => {
		expect.hasAssertions()

		await database.doc('patient/a').delete()

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

		await expect(patients('a').dataWithoutId()).resolves.toMatchObject({
			doctor: { id: 'aaa', secret: 'asd' },
		})
	})
})
