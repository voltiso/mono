// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { DTI, StrongRef } from '@voltiso/transactor'
import { Doc } from '@voltiso/transactor'
import * as ss from '@voltiso/transactor/schemas'
import { Assert, Is } from '@voltiso/util'

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
		mainDoctor: ss.strongRef<DoctorX>(),
	},
}) {}
const patients = db('patientX').register(Patient)

describe('ref', () => {
	it('checks numRefs on delete', async () => {
		expect.hasAssertions()

		Assert(Is<StrongRef<DoctorX>>().not.relatedTo<StrongRef<Patient>>())

		Assert(Is<StrongRef<DoctorX>>().not.relatedTo<typeof p.ref>())

		Assert(Is<typeof d>().not.relatedTo<typeof p>())
		Assert(Is<typeof d.ref>().not.relatedTo<typeof p.ref>())

		Assert.is<StrongRef<DoctorX>[DTI]['tag'], 'untagged'>()

		await database.doc('doctor/d').delete()
		await database.doc('patient/p').delete()
		const d = await doctors.add({
			profile: {
				name: 'd',
				specialty: 'xyz',
			},
		})

		Assert(Is(d.ref).identicalTo<StrongRef<DoctorX>>())

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

	// it('await ref', async () => {
	// 	expect.hasAssertions()

	// 	await database.doc('doctor/d').delete()
	// 	await database.doc('patient/p').delete()
	// 	const d = await doctors.add({
	// 		profile: {
	// 			name: 'd',
	// 			specialty: 'abc',
	// 		},
	// 	})

	// 	Assert.is<DoctorX, IDoc>()
	// 	Assert<IsIdentical<typeof d, DoctorX>>()

	// 	const p = await patients.add({
	// 		profile: {
	// 			name: 'p',
	// 			mainDoctor: d.ref,
	// 		},
	// 	})
	// 	const dd = await p.profile.mainDoctor
	// 	Assert<IsIdentical<typeof dd, DoctorX>>()

	// 	expect(dd.profile.name).toBe('d')
	// })
})
