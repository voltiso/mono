// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	$OutputType,
	IArray,
	InferableObject,
	InputType,
	ISchema,
	ITuple,
	Number,
	OutputType,
	Schema,
	Schemable,
	SchemableLike,
	Type_,
} from '@voltiso/schemar.types'
import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import * as s from '~'

describe('GetType', () => {
	it('simple', () => {
		expect.assertions(0)

		type A = OutputType<Number>
		Assert<IsIdentical<A, number>>()

		type B = OutputType<Schema>
		Assert<IsIdentical<B, unknown>>()
	})

	it('variance', <S extends { OutputType: string; InputType: string }>() => {
		expect.assertions(0)

		type A = OutputType<S>
		Assert.is<A, string>()

		type B = OutputType<SchemableLike>
		Assert<IsIdentical<B, unknown>>()
	})

	it('object', () => {
		expect.assertions(0)

		type A = Type_<object>
		Assert<IsIdentical<A, object>>()
	})

	it('literal', () => {
		expect.assertions(0)

		const a = {
			num: s.number,
		}
		type A = OutputType<typeof a>
		Assert<IsIdentical<A, { num: number }>>()

		const d = {
			num: s.number.optional,
		}
		type D = OutputType<typeof d>
		Assert<IsIdentical<D, { num?: number }>>()

		const e = {
			num: s.number.default(0),
		}
		type E = InputType<typeof e>
		Assert<IsIdentical<E, { num?: number | undefined }>>()

		type E2 = OutputType<typeof e>
		Assert<IsIdentical<E2, { num: number }>>()
	})

	it('index', () => {
		expect.assertions(0)

		type A = OutputType<{
			[k: string]: Number
		}>
		Assert<IsIdentical<A, { [k: string]: number }>>()

		type B = OutputType<{
			[k in string]: Number
		}>
		Assert<IsIdentical<B, { [k: string]: number }>>()
	})

	it('generic', () => {
		expect.assertions(0)

		type C = OutputType<Schemable>
		Assert<IsIdentical<C, unknown>>()
	})

	interface IDocTI {
		publicOnCreation: { id?: never; a: 1 }
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

		type A = OmitId<OutputType<TI['publicOnCreation']> & IntrinsicFields>

		Assert.is<A, InferableObject>()
		Assert.is<A, Schemable>()
	})

	it('intersection', () => {
		expect.assertions(0)

		const a = {
			a: s.number,
		}

		const b = {
			b: s.number.optional,
		}

		type A = OutputType<typeof a & typeof b>
		Assert<IsIdentical<A, { a: number; b?: number }>>()
	})

	it('arrays - complex', <S extends (ITuple | IArray) & ISchema>() => {
		expect.assertions(0)

		Assert.is<OutputType<(ITuple | IArray) & ISchema>, readonly unknown[]>()

		Assert.is<$OutputType<S>, readonly unknown[]>()

		Assert.is<never[], OutputType<(ITuple | IArray) & ISchema>>()

		// Assert.is<never[], [1, 2, 3]>()
		// Assert.is<never[], GetType<S>>()
	})
})
