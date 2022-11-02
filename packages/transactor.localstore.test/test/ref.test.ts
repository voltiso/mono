// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { DocIdBrand, DTI, IDoc } from '@voltiso/transactor'
import { Doc, sStrongRef, sVoltisoEntry } from '@voltiso/transactor'
import type { IsIdentical } from '@voltiso/util'
import { $Assert, $Is } from '@voltiso/util'

import { createTransactor, database } from './common'

const db = createTransactor()

class DoctorX extends Doc.public({
	profile: {
		name: s.string,
		specialty: s.string,
	},
}) {}
const doctors = db('doctorX').register(DoctorX)

class Patient extends Doc.public({
	profile: {
		name: s.string,
		mainDoctor: sStrongRef<DoctorX>(),
	},
}) {}
const patients = db('patientX').register(Patient)

describe('ref', () => {
	it('type', () => {
		expect.assertions(0)

		type DoctorData = ReturnType<DoctorX['dataWithId']>
		$Assert<
			IsIdentical<
				DoctorData,
				{
					id: string & DocIdBrand<typeof AnyDoc>
					profile: {
						name: string
						specialty: string
					}
					__voltiso: {
						aggregateTarget: {}
						numRefs: number
						aggregateSource: Record<string, Record<string, true>>
					}
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

		$Assert.is<DocRef<DoctorX>[DTI]['tag'], 'untagged'>()

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

		await expect(patients(p.id).data.__voltiso).resolves.toStrictEqual(
			sVoltisoEntry.validate({
				numRefs: 0,
			}),
		)

		await expect(doctors(d.id).data.__voltiso).resolves.toStrictEqual(
			sVoltisoEntry.validate({
				numRefs: 1,
			}),
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

		$Assert.is<DoctorX, IDoc>()
		$Assert<IsIdentical<typeof d, DoctorX>>()

		const p = await patients.add({
			profile: {
				name: 'p',
				mainDoctor: d.ref,
			},
		})
		const dd = await p.profile.mainDoctor
		$Assert<IsIdentical<typeof dd, DoctorX>>()

		expect(dd.profile.name).toBe('d')
	})
})
