// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import * as s from '@voltiso/schemar'
import type { DocIdString } from '@voltiso/transactor'
import { Doc, sStrongRef, sWeakRef, Transactor } from '@voltiso/transactor'
import type { StaticError } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import { firestore, firestoreModule } from './common/firestore'

const db = new Transactor(firestore, firestoreModule, {
	checkDecorators: false,
})

class Doctor extends Doc('doctorW').with({
	id: s.string,

	public: {
		profile: {
			name: s.string,
			specialty: s.string.optional,
		},

		xx: s.number.optional,
	},
}) {}
const doctors = db('doctor').register(Doctor)

class Patient extends Doc('patientW').with({
	id: s.string,

	public: {
		profile: {
			name: s.string,
			mainDoctor: sStrongRef<'doctorW'>(),
			maybeDoctor: sWeakRef<'doctorW'>(),
			x: s.number.optional,
		},

		x: s.number.optional,
	},
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

		type A = DocIdString<Doctor>
		type B = DocIdString

		$Assert.is<A, B>()
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
			$Assert.is<typeof p, StaticError>()
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

		await expect(patients(p.id).data.__voltiso).resolves.toMatchObject({
			numRefs: 0,
		})
		await expect(doctors(d.id).data.__voltiso).resolves.toMatchObject({
			numRefs: 1,
		})
		await expect(doctors(d.id).delete()).rejects.toThrow('numRefs')

		await p.delete()
		await d.delete()
	})
})
