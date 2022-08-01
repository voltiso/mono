// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { Id } from '@voltiso/transactor'
import { createTransactor, Doc } from '@voltiso/transactor'
import * as transactorSchemas from '@voltiso/transactor/schemas'
import type { StaticError } from '@voltiso/util'
import { Assert, Is } from '@voltiso/util'

import { firestore, firestoreModule } from './common/firestore'

const db = createTransactor(firestore, firestoreModule)

class Doctor extends Doc('doctorW').public({
	profile: {
		name: s.string,
		specialty: s.string.optional,
	},

	xx: s.number.optional,
}) {}
const doctors = db('doctor').register(Doctor)

class Patient extends Doc('patientW').public({
	profile: {
		name: s.string,
		mainDoctor: transactorSchemas.strongRef<'doctorW'>(),
		maybeDoctor: transactorSchemas.weakRef<'doctorW'>(),
		x: s.number.optional,
	},

	x: s.number.optional,
}) {}
const patients = db('patient').register(Patient)

declare module '@voltiso/transactor' {
	interface DocTypes {
		doctorW: Doctor
		patientW: Patient
	}
}

describe('ref', () => {
	it('type', () => {
		expect.assertions(0)

		Assert.is<Id<Doctor>, Id>()
		Assert(Is<Id>().not.subtypeOf<Id<Doctor>>())
	})

	it('checks numRefs on delete', async () => {
		expect.hasAssertions()

		await firestore.doc('doctor/d').delete()
		await firestore.doc('patient/p').delete()

		const d = await doctors.add({
			profile: {
				name: 'd',
			},
		})

		const p = await patients.add({
			profile: {
				name: 'p',
				mainDoctor: d.ref,
				maybeDoctor: d.ref,
			},
		})

		//
		;() => {
			const p = patients(d.id)
			Assert.is<typeof p, StaticError>()
		}

		//
		;() =>
			patients.add({
				profile: {
					name: 'p',
					// @ts-expect-error cannot mix ref types
					mainDoctor: p.ref,
				},
			})

		await expect(patients(p.id).data.__voltiso).resolves.toStrictEqual({
			numRefs: 0,
		})
		await expect(doctors(d.id).data.__voltiso).resolves.toStrictEqual({
			numRefs: 1,
		})
		await expect(doctors(d.id).delete()).rejects.toThrow('numRefs')

		await p.delete()
		await d.delete()
	})
})
