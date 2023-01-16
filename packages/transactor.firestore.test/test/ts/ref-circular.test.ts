// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/assertor'
import * as s from '@voltiso/schemar'
import type { DocIdString, DocRef } from '@voltiso/transactor'
import {
	Doc,
	method,
	sStrongRef,
	sWeakRef,
	Transactor,
} from '@voltiso/transactor'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import { firestore, firestoreModule } from './common/firestore'

const db = new Transactor(firestore, firestoreModule)

class DoctorLorcan extends Doc('doctorLorcan').with({
	public: {
		name: s.string,
		friend: sStrongRef<'doctorLorcan'>().optional,
		maybeFriend: sWeakRef<'doctorLorcan'>().optional,
	},
}) {
	@method
	async setFriend(friend?: DocRef<'doctorLorcan'>) {
		// type X = GetDocTag<DocRef<DoctorLorcan>>
		// $Assert<IsIdentical<X, 'doctorLorcan'>>()

		this.data.name = 'Mr Friendly'

		if (friend) this.data.friend = friend
		else delete this.data.friend
	}
}
const doctors = db.register(DoctorLorcan)

declare module '@voltiso/transactor' {
	interface DocTypes {
		doctorLorcan: DoctorLorcan
		clientXyz: ClientXyz
	}
}

class ClientXyz extends Doc('clientXyz').with({
	id: s.string,

	public: {
		asd: s.string,
	},
}) {}

describe('emu-ts', () => {
	describe('ref', () => {
		it('checks numRefs on delete', async () => {
			expect.hasAssertions()

			type ClientId = ClientXyz['id']
			$Assert<IsIdentical<ClientId, DocIdString<ClientXyz>>>()

			await firestore.doc('doctor/d').delete()
			await firestore.doc('patient/p').delete()

			const a = await doctors.add({
				name: 'a',
			})

			const b = await doctors.add({
				name: 'b',
				friend: a.ref,
			})

			$Assert<IsIdentical<typeof b, DoctorLorcan>>()

			const c = 0 as unknown as ClientXyz
			;() =>
				doctors.add({
					name: 'b',
					// @ts-expect-error ref type mismatch
					friend: c.ref,
				})
			assert(b.data.friend)
			$Assert<IsIdentical<typeof b.data.friend, DocRef<'doctorLorcan'>>>()

			const name = await b.data.friend.data.name

			expect(name).toBe('a')

			await b.data.friend.methods.setFriend(b.ref)
			await b.data.friend.methods.setFriend()

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
				doctors('adam' as DocIdString<DoctorLorcan>).methods.setFriend(
					// @ts-expect-error Assigning WeakRef to StrongRef
					doctors('artur' as DocIdString<'doctorLorcan'>),
				),
			).rejects.toThrow('exist')

			await expect(
				doctors('adam').methods.setFriend(
					doctors('artur') as DocRef<'doctorLorcan'>,
				),
			).rejects.toThrow('exist')

			await expect(
				// @ts-expect-error DocType mismatch
				// eslint-disable-next-line @typescript-eslint/no-unsafe-call
				doctors('adam' as DocIdString<ClientXyz>).setFriend(
					doctors('artur') as DocRef<'doctorLorcan'>,
				),
			).rejects.toThrow('exist')
		})
	})
})
