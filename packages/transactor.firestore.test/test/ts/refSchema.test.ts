// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
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

		expect(CustomDocRef.name).toBe('lazyConstructor(_CustomDocRef)')

		const myWeakRef = db('a/b/c/d')
		const myRef = new CustomDocRef(
			(myWeakRef as any)._context as never,
			myWeakRef.path.toString(),
			{ isStrong: true },
		)

		const aa = s.schema(mySchema).validate({ myRef, myWeakRef })

		expect(aa.myRef.isStrong).toBeTruthy()
		expect(aa.myWeakRef.isStrong).toBeFalsy()

		const bb = s.schema(mySchema).validate({ myRef, myWeakRef: myRef })

		expect(bb.myRef.isStrong).toBeTruthy()
		expect(bb.myWeakRef.isStrong).toBeFalsy()

		expect(() =>
			s.schema(mySchema).validate({ myRef: myWeakRef, myWeakRef }),
		).toThrow('.myRef should be strong ref')
	})
})
