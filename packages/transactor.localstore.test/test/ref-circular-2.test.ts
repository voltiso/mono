// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Doc, sRef } from '@voltiso/transactor'

import { createTransactor } from './common'

const db = createTransactor()

class MyDoctorCircular extends Doc('MyDoctorCircular')({
	public: {
		patient: sRef<'MyPatientCircular'>(),
	},
}) {}

class MyPatientCircular extends Doc('MyPatientCircular')({
	public: {
		doctor: sRef<'MyDoctorCircular'>(),
	},
}) {}

declare module '@voltiso/transactor' {
	interface DocTypes {
		MyDoctorCircular: MyDoctorCircular
		MyPatientCircular: MyPatientCircular
	}
}

const doctors = db.register(MyDoctorCircular)
const patients = db.register(MyPatientCircular)

// class Client extends Doc.public({
// 	asd: z.string,
// }) {}
// const clients = db('client').register(Client)

describe('localstore', () => {
	describe('ref', () => {
		it('type', async () => {
			expect.assertions(0)

			const patient = patients('adam')

			//
			;() => doctors.add({
				patient: patient.asStrongRef,
			})
		})
	})
})
