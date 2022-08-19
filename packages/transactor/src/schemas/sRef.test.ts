// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import type { IndexedDoc, StrongRef } from '~'
import { Doc } from '~'

import { sStrongRef } from '.'

class RefTestDoc extends Doc('refTestDoc')({
	public: {
		myIndexedStrongRef: sStrongRef,
		myOptionalIndexedStrongRef: sStrongRef.optional,
		myCustomStrongRef: sStrongRef<'refTestDoc'>(),
	},
}) {}

declare module '~' {
	interface DocTypes {
		refTestDoc: RefTestDoc
	}
}

describe('ref schema', () => {
	it('type', () => {
		expect.assertions(0)

		const a = sStrongRef

		type A = typeof a.OutputType
		Assert<IsIdentical<A, StrongRef<IndexedDoc>>>()
	})

	it('type 2', () => {
		expect.assertions(0)

		type A = RefTestDoc['data']
		Assert<
			IsIdentical<
				Omit<A, '__voltiso'>,
				{
					myIndexedStrongRef: StrongRef<IndexedDoc>
					myCustomStrongRef: StrongRef<RefTestDoc>
					myOptionalIndexedStrongRef?: StrongRef<IndexedDoc>
				}
			>
		>()
	})
})
