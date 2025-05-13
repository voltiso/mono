// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import type { AnyDoc, DocRef } from '@voltiso/transactor'
import { Doc, sRef } from '@voltiso/transactor'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

class RefTestDoc extends Doc('refTestDoc').with({
	public: {
		myIndexedStrongRef: sRef,
		myOptionalIndexedStrongRef: sRef.optional,
		myCustomStrongRef: sRef<'refTestDoc'>(),
	},
}) {}

declare module '@voltiso/transactor' {
	interface DocTypes {
		refTestDoc: RefTestDoc
	}
}

describe('ref schema', () => {
	it('type', () => {
		const a = sRef

		type A = typeof a.Output
		$Assert<IsIdentical<A, DocRef<AnyDoc>>>()
	})

	it('type 2', () => {
		expect.assertions(0)

		// type B = RefTestDoc['data']['myCustomStrongRef']

		type A = RefTestDoc['data']
		$Assert<
			IsIdentical<
				Omit<A, '__voltiso'>,
				{
					myIndexedStrongRef: DocRef<AnyDoc>
					myCustomStrongRef: DocRef<'refTestDoc'>
					myOptionalIndexedStrongRef?: DocRef<AnyDoc>
				}
			>
		>()
	})
})
