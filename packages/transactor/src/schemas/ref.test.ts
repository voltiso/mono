// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import type { IndexedDoc, StrongRefSchema } from '~'
import { Doc } from '~'

import { strongRef } from '.'

class RefTestDoc extends Doc('refTestDoc')({
	public: {
		myIndexedStrongRef: strongRef,
		myOptionalIndexedStrongRef: strongRef.optional,
		myCustomStrongRef: strongRef<'refTestDoc'>(),
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

		const a = strongRef

		type A = typeof a.OutputType
		Assert<IsIdentical<A, StrongRefSchema<IndexedDoc>>>()
	})

	it('type 2', () => {
		expect.assertions(0)

		type A = RefTestDoc['data']
		Assert<
			IsIdentical<
				Omit<A, '__voltiso'>,
				{
					readonly id?: never
					myIndexedStrongRef: StrongRefSchema<IndexedDoc>
					myCustomStrongRef: StrongRefSchema<RefTestDoc>
					myOptionalIndexedStrongRef?: StrongRefSchema<IndexedDoc>
				}
			>
		>()
	})
})
