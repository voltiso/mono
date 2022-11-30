// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type {
	$$Doc,
	DocIdBrand,
	DocRef,
	GetVoltisoEntry,
} from '@voltiso/transactor'
import { Doc, sStrongRef, sVoltisoEntry } from '@voltiso/transactor'
import type { IsIdentical } from '@voltiso/util'
import { $Assert, $Is, omit } from '@voltiso/util'

import { createTransactor, database } from './common'

const db = createTransactor()

declare module '@voltiso/transactor' {
	interface DocTypes {
		DoctorXNala: DoctorX
		PatientNala: Patient
	}
}

class DoctorX extends Doc('DoctorXNala').with({
	id: s.string,

	public: {
		profile: {
			name: s.string,
			specialty: s.string,
		},
	},
}) {}
const doctors = db.register(DoctorX)

class Patient extends Doc('PatientNala').with({
	id: s.string,

	public: {
		profile: {
			name: s.string,
			mainDoctor: sStrongRef<DoctorX>(),
		},
	},
}) {}
const patients = db.register(Patient)

describe('ref', () => {
	it('type', () => {
		type DoctorData = ReturnType<DoctorX['dataWithId']>
		$Assert<
			IsIdentical<
				DoctorData,
				{
					id: string & DocIdBrand<'DoctorXNala'>
					profile: {
						name: string
						specialty: string
					}
					__voltiso: GetVoltisoEntry<DoctorX>
				}
			>
		>()
	})

	it('checks numRefs on delete', async () => {
		expect.hasAssertions()

		$Assert($Is<DocRef<DoctorX>>().not.relatedTo<DocRef<Patient>>())

		$Assert($Is<DocRef<DoctorX>>().not.relatedTo<typeof p.ref>())

		$Assert($Is<typeof d>().not.relatedTo<typeof p>())
		$Assert($Is<typeof d.ref>().not.relatedTo<typeof p.ref>())

		await database.doc('doctor/d').delete()
		await database.doc('patient/p').delete()
		const d = await doctors.add({
			profile: {
				name: 'd',
				specialty: 'xyz',
			},
		})

		$Assert($Is(d.ref).identicalTo<DocRef<DoctorX>>())

		const p = await patients.add({
			profile: {
				name: 'p',
				mainDoctor: d.ref,
			},
		})

		;() =>
			patients.add({
				profile: {
					name: 'p',
					// @ts-expect-error cannot mix doctor and patient
					mainDoctor: p.ref,
				},
			})

		await expect(patients(p.id).data.__voltiso).resolves.toMatchObject(
			omit(
				sVoltisoEntry.validate({
					numRefs: 0,
				}),
				'createdAt',
				'updatedAt',
			),
		)

		await expect(doctors(d.id).data.__voltiso).resolves.toMatchObject(
			omit(sVoltisoEntry.validate({
				numRefs: 1,
			}), 'createdAt', 'updatedAt'),
		)

		await expect(doctors(d.id).delete()).rejects.toThrow('numRefs')

		await p.delete()
		await d.delete()
	})

	it('await ref', async () => {
		expect.hasAssertions()

		await database.doc('doctorX/d').delete()
		await database.doc('patientX/p').delete()

		const d = await doctors.add({
			profile: {
				name: 'd',
				specialty: 'abc',
			},
		})

		$Assert.is<DoctorX, $$Doc>()
		$Assert<IsIdentical<typeof d, DoctorX>>()

		const p = await patients.add({
			profile: {
				name: 'p',
				mainDoctor: d.ref,
			},
		})
		const dd = await p.data.profile.mainDoctor
		$Assert<IsIdentical<typeof dd, DoctorX>>()

		expect(dd.data.profile.name).toBe('d')
	})
})
