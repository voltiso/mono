// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CustomString$, Schema } from '@voltiso/schemar'
import { SCHEMA_NAME } from '@voltiso/schemar'
import * as s from '@voltiso/schemar'
import { Doc } from '@voltiso/transactor'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import { createTransactor, database } from './common'

const db = createTransactor()

declare module '@voltiso/transactor' {
	interface DocTypes {
		xyz: Doctor
	}
}

class Doctor extends Doc('xyz').with({
	id: s.string.maxLength(3),

	public: {
		specialty: s.string.optional,
	},

	private: {
		secret: s.string,
	},
}) {}

class Patient extends Doc.with({
	id: s.string,

	public: {
		doctor: Doctor.schemaWithId.optional,
	},
}) {}

const patients = db('patient').register(Patient)

describe('docSchema', () => {
	it('should validate schema', async () => {
		expect.hasAssertions()

		expect(Doctor.schemaWithId[SCHEMA_NAME]).toBe('Object')

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

		await expect(patients('a').data).resolves.toMatchObject({
			doctor: { id: 'aaa', secret: 'asd' },
		})

		$Assert<
			IsIdentical<typeof Doctor.idSchema, CustomString$<{ maxLength: 3 }>>
		>()

		$Assert<
			IsIdentical<typeof Doctor.schemaWithId.getShape.id, Schema<string>>
		>()

		expect(() => Doctor.schemaWithId.getShape.id.validate('12345')).toThrow(
			'at most 3',
		)

		expect(() => Doctor.idSchema.validate('12345')).toThrow('at most 3')
	})
})
