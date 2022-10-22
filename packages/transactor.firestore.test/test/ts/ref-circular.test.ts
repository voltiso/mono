// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { DTI, Id, StrongRef } from '@voltiso/transactor'
import { sStrongRef, sWeakRef } from '@voltiso/transactor'
import { createTransactor, Doc, method } from '@voltiso/transactor'
import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import { firestore, firestoreModule } from './common/firestore'

const db = createTransactor(firestore, firestoreModule)

class DoctorLorcan extends Doc('doctorLorcan').fields({
	public: {
		name: s.string,
		friend: sStrongRef<'doctorLorcan'>().optional,
		maybeFriend: sWeakRef<'doctorLorcan'>().optional,
	},
}) {
	@method
	async setFriend(friend?: StrongRef<DoctorLorcan>) {
		type X = StrongRef<DoctorLorcan>[DTI]['tag']
		Assert<IsIdentical<X, 'doctorLorcan'>>()

		this.name = 'Mr Friendly'

		if (friend) this.friend = friend
		else delete this.friend
	}
}
const doctors = db.register(DoctorLorcan)

declare module '@voltiso/transactor' {
	interface DocTypes {
		doctorLorcan: DoctorLorcan
		clientXyz: ClientXyz
	}
}

class ClientXyz extends Doc('clientXyz').public({
	asd: s.string,
}) {}

describe('emu-ts', () => {
	describe('ref', () => {
		it('checks numRefs on delete', async () => {
			expect.hasAssertions()

			type ClientId = ClientXyz['id']
			Assert<IsIdentical<ClientId, Id<ClientXyz>>>()

			await firestore.doc('doctor/d').delete()
			await firestore.doc('patient/p').delete()

			const a = await doctors.add({
				name: 'a',
			})

			const b = await doctors.add({
				name: 'b',
				friend: a.ref,
			})

			Assert<IsIdentical<typeof b, DoctorLorcan>>()

			const c = 0 as unknown as ClientXyz
			;() =>
				doctors.add({
					name: 'b',
					// @ts-expect-error ref type mismatch
					friend: c.ref,
				})
			$assert(b.friend)
			Assert<IsIdentical<typeof b.friend, StrongRef<DoctorLorcan>>>()

			const name = await b.friend.data.name

			expect(name).toBe('a')

			await b.friend.methods.setFriend(b.ref)
			await b.friend.methods.setFriend()

			// await expect(doctors(b.id).data).resolves.toStrictEqual({
			// 	numRefs: 1,
			// })

			await expect(doctors(a.id).data.__voltiso).resolves.toMatchObject({
				numRefs: 1,
			})
			await expect(doctors(a.id).delete()).rejects.toThrow('numRefs')

			await b.delete()
			await a.delete()
		})

		it('works with methods', async () => {
			expect.hasAssertions()

			await expect(
				doctors('adam' as Id<DoctorLorcan>).setFriend(
					// @ts-expect-error Assigning WeakRef to StrongRef
					doctors('artur' as Id<'doctorLorcan'>),
				),
			).rejects.toThrow('exist')

			await expect(
				doctors('adam').setFriend(doctors('artur') as StrongRef<DoctorLorcan>),
			).rejects.toThrow('exist')

			await expect(
				// @ts-expect-error DocType mismatch
				// eslint-disable-next-line @typescript-eslint/no-unsafe-call
				doctors('adam' as Id<ClientXyz>).setFriend(
					doctors('artur') as StrongRef<DoctorLorcan>,
				),
			).rejects.toThrow('exist')
		})
	})
})
