// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import { CustomDocRef, sRef, sWeakRef, Transactor } from '@voltiso/transactor'

import { firestore, firestoreModule } from './common/firestore'

const db = new Transactor(firestore, firestoreModule)

describe('ref schema', () => {
	it('ref is converted to weakRef', () => {
		expect.hasAssertions()

		const mySchema = {
			myRef: sRef,
			myWeakRef: sWeakRef,
		}

		expect(CustomDocRef.name).toBe('lazyConstructor(StrongDocRefImpl)')

		const myWeakRef = db('a/b/c/d')
		const myRef = new CustomDocRef(
			myWeakRef._context as never,
			myWeakRef.path.toString(),
		)

		const aa = s.schema(mySchema).validate({ myRef, myWeakRef })

		expect(aa.myRef).toBeInstanceOf(CustomDocRef)
		expect(aa.myWeakRef).toBeInstanceOf(CustomDocRef)

		const bb = s.schema(mySchema).validate({ myRef, myWeakRef: myRef })

		expect(bb.myRef).toBeInstanceOf(CustomDocRef)
		expect(bb.myWeakRef).toBeInstanceOf(CustomDocRef)

		expect(() =>
			s.schema(mySchema).validate({ myRef: myWeakRef, myWeakRef }),
		).toThrow(
			"[@voltiso/schemar] .myRef instanceof should be 'StrongDocRefImpl' (got 'WeakDocRefImpl')",
		)
	})
})
