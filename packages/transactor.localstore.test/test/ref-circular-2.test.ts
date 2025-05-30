// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, it } from '@jest/globals'
import { Doc, sRef } from '@voltiso/transactor'

import { createTransactor } from './common'

const db = createTransactor()

class MyDoctorCircular extends Doc('MyDoctorCircular').with({
	public: {
		patient: sRef<'MyPatientCircular'>(),
	},
}) {}

class MyPatientCircular extends Doc('MyPatientCircular').with({
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
			const patient = patients('adam')

			//
			;() =>
				doctors.add({
					patient: patient.asStrongRef,
				})
		})
	})
})
