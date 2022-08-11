// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/assertor'
import * as s from '@voltiso/schemar'
import { Doc, doc } from '@voltiso/transactor'
import * as transactorSchemas from '@voltiso/transactor/schemas'
import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import { createTransactor, database } from './common'

const db = createTransactor()

class MyDoctor extends Doc('MyDoctor').fields({
	public: {
		name: s.string,
		friend: transactorSchemas.strongRef<'MyDoctor'>().optional,
	},
}) {
	// declare friend?: Ref<Doctor>
}

declare module '@voltiso/transactor' {
	interface DocTypes {
		MyDoctor: MyDoctor
	}
}

const doctors = db.register(MyDoctor)

// class Client extends Doc.public({
// 	asd: z.string,
// }) {}
// const clients = db('client').register(Client)

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
			Assert<IsIdentical<typeof b, MyDoctor>>()
			$assert(b.friend)

			const f = await b.friend
			Assert<IsIdentical<typeof f, MyDoctor>>()

			expect(f.name).toBe('a')

			const name = await doc(b.friend).name

			expect(name).toBe('a')

			const name2 = await b.friend.data.name

			expect(name2).toBe('a')

			await expect(doctors(a.id).data.__voltiso).resolves.toStrictEqual({
				numRefs: 1,
			})
			await expect(doctors(a.id).delete()).rejects.toThrow('numRefs')

			await b.delete()
			await a.delete()
		})
	})
})
