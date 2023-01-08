// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/assertor'
import * as s from '@voltiso/schemar'
import { Doc, sStrongRef, sVoltisoEntry } from '@voltiso/transactor'
import type { IsIdentical } from '@voltiso/util'
import { $Assert, omit } from '@voltiso/util'

import { createTransactor, database } from './common'

const db = createTransactor()

class MyDoctor extends Doc('MyDoctor').with({
	public: {
		name: s.string,
		friend: sStrongRef<'MyDoctor'>().optional,
	},
}) {}

declare module '@voltiso/transactor' {
	interface DocTypes {
		MyDoctor: MyDoctor
	}
}

const doctors = db.register(MyDoctor)

describe('localstore', () => {
	describe('ref', () => {
		it('checks numRefs on delete', async () => {
			expect.hasAssertions()

			await database.doc('doctor/d').delete()
			await database.doc('patient/p').delete()
			const a = await doctors.add({
				name: 'a',
			})
			const b = await doctors.add({
				name: 'b',
				friend: a.ref,
			})
			// a.ref.get()
			$Assert<IsIdentical<typeof b, MyDoctor>>()
			assert(b.data.friend)

			const f = await b.data.friend
			$Assert<IsIdentical<typeof f, MyDoctor>>()

			expect(f.data.name).toBe('a')

			const name = await b.data.friend.data.name

			expect(name).toBe('a')

			const name2 = await b.data.friend.data.name

			expect(name2).toBe('a')

			await expect(doctors(a.id).data.__voltiso).resolves.toMatchObject(
				omit(
					sVoltisoEntry.validate({
						numRefs: 1,
					}),
					'createdAt',
					'updatedAt',
				),
			)
			await expect(doctors(a.id).delete()).rejects.toThrow('numRefs')

			await b.delete()
			await a.delete()
		})
	})
})
