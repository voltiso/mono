// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import type { RootSchema } from '~'
import * as s from '~/schemas/index'

import type { GetInputType, GetOutputType } from './GetType'

describe('GetType', () => {
	it('simple', () => {
		expect.assertions(0)

		type A = GetOutputType<s.Number>
		Assert<IsIdentical<A, number>>()

		type B = GetOutputType<RootSchema>
		Assert<IsIdentical<B, unknown>>()
	})

	it('literal', () => {
		expect.assertions(0)

		const a = {
			num: s.number,
		}
		type A = GetOutputType<typeof a>
		Assert<IsIdentical<A, { num: number }>>()

		const d = {
			num: s.number.optional,
		}
		type D = GetOutputType<typeof d>
		Assert<IsIdentical<D, { num?: number }>>()

		const e = {
			num: s.number.default(0),
		}
		type E = GetInputType<typeof e>
		Assert<IsIdentical<E, { num?: number }>>()

		type E2 = GetOutputType<typeof e>
		Assert<IsIdentical<E2, { num: number }>>()
	})

	it('index', () => {
		expect.assertions(0)

		type A = GetOutputType<{
			[k: string]: s.Number
		}>
		Assert<IsIdentical<A, { [k: string]: number }>>()

		type B = GetOutputType<{
			[k in string]: s.Number
		}>
		Assert<IsIdentical<B, { [k: string]: number }>>()
	})

	it('generic', () => {
		expect.assertions(0)

		type C = GetOutputType<RootSchemable>
		Assert<IsIdentical<C, unknown>>()
	})

	interface IDocTI {
		const: { id?: never; a: 1 }
		public: { id?: never }
	}

	it('generic - Omit', <TI extends IDocTI>() => {
		expect.assertions(0)

		type IntrinsicFields = { __voltiso?: { numRefs: number } }
		Assert.is<IntrinsicFields, InferableObject>()

		type OmitId<T> = T extends unknown
			? {
					[k in keyof T]: T[k]
			  }
			: never

		type A = OmitId<GetOutputType<TI['const']> & IntrinsicFields>

		Assert.is<A, InferableObject>()
		Assert.is<A, RootSchemable>()
	})

	it('intersection', () => {
		expect.assertions(0)

		const a = {
			a: s.number,
		}

		const b = {
			b: s.number.optional,
		}

		type A = GetOutputType<typeof a & typeof b>
		Assert<IsIdentical<A, { a: number; b?: number }>>()
	})

	it('arrays - complex', <S extends (s.ITuple | s.IArray) & IRootSchema>() => {
		expect.assertions(0)

		Assert.is<
			GetOutputType<(s.ITuple | s.IArray) & IRootSchema>,
			readonly unknown[]
		>()

		Assert.is<GetOutputType<S>, readonly unknown[]>()

		Assert.is<never[], GetOutputType<(s.ITuple | s.IArray) & IRootSchema>>()

		// Assert.is<never[], [1, 2, 3]>()
		// Assert.is<never[], GetType<S>>()
	})
})
