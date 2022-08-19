// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import {
	createTransactor,
	sStrongRef,
	StrongDocRef,
	sWeakRef,
	WeakDocRef,
} from '@voltiso/transactor'

import { firestore, firestoreModule } from './common/firestore'

const db = createTransactor(firestore, firestoreModule)

describe('ref schema', () => {
	it('ref is converted to weakRef', () => {
		expect.hasAssertions()

		const mySchema = {
			myRef: sStrongRef,
			myWeakRef: sWeakRef,
		}

		expect(StrongDocRef.name).toBe('lazyConstructor(StrongDocRefImpl)')

		const myWeakRef = db('a/b/c/d')
		const myRef = new StrongDocRef(
			// @ts-expect-error `_context` is hidden
			myWeakRef._context as never,
			myWeakRef.path.pathString,
		)

		const aa = s.schema(mySchema).validate({ myRef, myWeakRef })

		expect(aa.myRef).toBeInstanceOf(StrongDocRef)
		expect(aa.myWeakRef).toBeInstanceOf(WeakDocRef)

		const bb = s.schema(mySchema).validate({ myRef, myWeakRef: myRef })

		expect(bb.myRef).toBeInstanceOf(StrongDocRef)
		expect(bb.myWeakRef).toBeInstanceOf(WeakDocRef)

		expect(() =>
			s.schema(mySchema).validate({ myRef: myWeakRef, myWeakRef }),
		).toThrow(
			"[@voltiso/schemar] .myRef instanceof should be 'StrongDocRefImpl' (got 'WeakDocRefImpl')",
		)
	})
})
