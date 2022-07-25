// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import { createTransactor, DocRef, WeakDocRef } from '@voltiso/transactor'
import * as ts from '@voltiso/transactor/schemas'

import { firestore, firestoreModule } from './common/firestore.js'

const db = createTransactor(firestore, firestoreModule)

describe('ref schema', () => {
	it('ref is converted to weakRef', () => {
		expect.hasAssertions()

		const mySchema = {
			myRef: ts.ref,
			myWeakRef: ts.weakRef,
		}

		expect(DocRef.name).toBe('DocRef_')

		const myWeakRef = db('a/b/c/d')
		const myRef = new DocRef(
			// @ts-expect-error `_context` is hidden
			myWeakRef._context as never,
			myWeakRef.path.pathString,
		)

		const aa = s.schema(mySchema).validate({ myRef, myWeakRef })

		expect(aa.myRef).toBeInstanceOf(DocRef)
		expect(aa.myWeakRef).toBeInstanceOf(WeakDocRef)

		const bb = s.schema(mySchema).validate({ myRef, myWeakRef: myRef })

		expect(bb.myRef).toBeInstanceOf(DocRef)
		expect(bb.myWeakRef).toBeInstanceOf(WeakDocRef)

		expect(() =>
			s.schema(mySchema).validate({ myRef: myWeakRef, myWeakRef }),
		).toThrow(".myRef instanceof should be 'DocRef_' (got 'WeakDocRef_')")
	})
})
