// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import type { InferableObject, ObjectType_ } from '~'
import * as s from '~'

describe('GetObjectType', () => {
	it('literal', () => {
		expect.assertions(0)

		Assert.is<ObjectType_<{}, { kind: 'out' }>, {}>()

		type X = ObjectType_<{ a: 1; b: number; c: s.String }, { kind: 'out' }>
		Assert<IsIdentical<X, { a: 1; b: number; c: string }>>()
	})

	it('optional', () => {
		expect.assertions(0)

		const a = {
			opt: s.number.optional,
		}
		type A = ObjectType_<typeof a, { kind: 'out' }>
		Assert<IsIdentical<A, { opt?: number }>>()
	})

	it('default', () => {
		expect.assertions(0)

		const a = {
			opt: s.number.default(123 as const),
		}
		type AOut = ObjectType_<typeof a, { kind: 'out' }>
		type AIn = ObjectType_<typeof a, { kind: 'in' }>
		Assert<IsIdentical<AOut, { opt: number }>>()
		Assert<IsIdentical<AIn, { opt?: number | undefined }>>()

		const b = s.object(a)
		type BOut = typeof b.OutputType
		type BIn = typeof b.InputType
		Assert<IsIdentical<BOut, { opt: number }>>()
		Assert<IsIdentical<BIn, { opt?: number | undefined }>>()

		type COut = ObjectType_<typeof b.getShape, { kind: 'out' }>
		type CIn = ObjectType_<typeof b.getShape, { kind: 'in' }>
		Assert<IsIdentical<COut, { opt: number }>>()
		Assert<IsIdentical<CIn, { opt?: number | undefined }>>()
	})

	it('index', () => {
		expect.assertions(0)

		type A = ObjectType_<InferableObject, { kind: 'out' }>
		Assert<
			IsIdentical<
				A,
				{
					[k: string | number | symbol]: unknown
				}
			>
		>()
	})
})
