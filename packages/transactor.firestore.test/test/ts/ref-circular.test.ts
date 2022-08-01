// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/assertor'
import * as s from '@voltiso/schemar'
import type { DTI, Id, StrongRef } from '@voltiso/transactor'
import { createTransactor, Doc, method } from '@voltiso/transactor'
import * as transactorSchemas from '@voltiso/transactor/schemas'
import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import { firestore, firestoreModule } from './common/firestore'

const db = createTransactor(firestore, firestoreModule)

class DoctorD extends Doc('doctorD').fields({
	public: {
		name: s.string,
		friend: transactorSchemas.strongRef<'doctorD'>().optional,
		maybeFriend: transactorSchemas.weakRef<'doctorD'>().optional,
	},
}) {
	@method
	async setFriend(friend?: StrongRef<DoctorD>) {
		type X = StrongRef<DoctorD>[DTI]['tag']
		Assert<IsIdentical<X, 'doctorD'>>()

		this.name = 'Mr Friendly'

		if (friend) this.friend = friend
		else delete this.friend
	}
}
const doctors = db.register(DoctorD)

declare module '@voltiso/transactor' {
	interface DocTypes {
		doctorD: DoctorD
		client: Client

		// wrongType: number
	}
}

class Client extends Doc('client').public({
	asd: s.string,
}) {}

describe('emu-ts', () => {
	describe('ref', () => {
		it('checks numRefs on delete', async () => {
			expect.hasAssertions()

			type ClientId = Client['id']
			Assert<IsIdentical<ClientId, Id<Client>>>()

			await firestore.doc('doctor/d').delete()
			await firestore.doc('patient/p').delete()

			const a = await doctors.add({
				name: 'a',
			})

			const b = await doctors.add({
				name: 'b',
				friend: a.ref,
			})

			Assert<IsIdentical<typeof b, DoctorD>>()

			const c = 0 as unknown as Client
			;() =>
				doctors.add({
					name: 'b',
					// @ts-expect-error ref type mismatch
					friend: c.ref,
				})
			assert(b.friend)
			Assert<IsIdentical<typeof b.friend, Ref<DoctorD>>>()

			const name = await b.friend.data.name

			expect(name).toBe('a')

			await b.friend.methods.setFriend(b.ref)
			await b.friend.methods.setFriend()

			await expect(doctors(a.id).data.__voltiso).resolves.toStrictEqual({
				numRefs: 1,
			})
			await expect(doctors(a.id).delete()).rejects.toThrow('numRefs')

			await b.delete()
			await a.delete()
		})

		it('works with methods', async () => {
			expect.hasAssertions()

			// @ts-expect-error Assigning WeakRef to Ref
			await expect(
				doctors('adam' as Id<DoctorD>).setFriend(
					doctors('artur' as Id<'doctorD'>),
				),
			).rejects.toThrow('exist')

			await expect(
				doctors('adam').setFriend(doctors('artur') as Ref<DoctorD>),
			).rejects.toThrow('exist')

			// @ts-expect-error DocType mismatch

			await expect(
				doctors('adam' as Id<Client>).setFriend(
					doctors('artur') as Ref<DoctorD>,
				),
			).rejects.toThrow('exist')
		})
	})
})
