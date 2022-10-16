// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	IndexedDoc,
	StrongDocRef,
	StrongDocRefBase,
} from '@voltiso/transactor'
import { Doc, sStrongRef } from '@voltiso/transactor'
import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

class RefTestDoc extends Doc('refTestDoc')({
	public: {
		myIndexedStrongRef: sStrongRef,
		myOptionalIndexedStrongRef: sStrongRef.optional,
		myCustomStrongRef: sStrongRef<'refTestDoc'>(),
	},
}) {}

declare module '@voltiso/transactor' {
	interface DocTypes {
		refTestDoc: RefTestDoc
	}
}

describe('ref schema', () => {
	it('type', () => {
		expect.assertions(0)

		const a = sStrongRef

		type A = typeof a.OutputType
		Assert<IsIdentical<A, StrongDocRef<IndexedDoc>>>()
	})

	it('type 2', () => {
		expect.assertions(0)

		// type B = RefTestDoc['data']['myCustomStrongRef']

		type A = RefTestDoc['data']
		Assert<
			IsIdentical<
				Omit<A, '__voltiso'>,
				{
					myIndexedStrongRef: StrongDocRef<IndexedDoc>
					myCustomStrongRef: StrongDocRefBase<RefTestDoc>
					myOptionalIndexedStrongRef?: StrongDocRef<IndexedDoc>
				}
			>
		>()
	})
})
