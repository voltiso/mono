// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	$$Inferable,
	$$Schema,
	$$Schemable,
	$Output,
	IArray,
	Inferable,
	InferableLiteral,
	InferableObject,
	Input,
	ISchema,
	ITuple,
	Number,
	Output,
	Schema,
	Schemable,
	SchemaLike,
	Type,
} from '@voltiso/schemar.types'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import * as s from '~'

describe('GetType', () => {
	it('simple', () => {
		expect.assertions(0)

		type A = Output<Number>
		$Assert<IsIdentical<A, number>>()

		type B = Output<Schema>
		$Assert<IsIdentical<B, unknown>>()
	})

	it('variance', <S extends $$Schema & {
		Output: string
		Input: string
	}>() => {
		expect.assertions(0)

		type A = Output<S>
		$Assert.is<A, string>()

		//

		type B1 = Output<$$Schemable>
		$Assert<IsIdentical<B1, unknown>>()

		type B2 = Output<Schemable>
		$Assert<IsIdentical<B2, unknown>>()

		//

		type C1 = Output<$$Schema>
		$Assert<IsIdentical<C1, unknown>>()

		type C2 = Output<SchemaLike>
		$Assert<IsIdentical<C2, unknown>>()

		type C3 = Output<ISchema>
		$Assert<IsIdentical<C3, unknown>>()

		//

		type D2 = Output<Inferable>
		$Assert<IsIdentical<D2, {} | readonly unknown[] | InferableLiteral>>()

		type D1 = Output<$$Inferable>
		$Assert<IsIdentical<D1, {} | readonly unknown[] | InferableLiteral>>()
	})

	it('object', () => {
		expect.assertions(0)

		// @ts-expect-error not every project is inferable (index signature missing)
		type A = Type<object>
		$Assert<IsIdentical<A, never>>()
	})

	it('literal', () => {
		const a = {
			num: s.number,
		}
		type A = Output<typeof a>
		$Assert<IsIdentical<A, { num: number }>>()

		const d = {
			num: s.number.optional,
		}
		type D = Output<typeof d>
		$Assert<IsIdentical<D, { num?: number }>>()

		const e = {
			num: s.number.default(0),
		}
		type E = Input<typeof e>
		$Assert<IsIdentical<E, { num?: number | undefined } | undefined>>()

		type E2 = Output<typeof e>
		$Assert<IsIdentical<E2, { num: number }>>()
	})

	it('index', () => {
		expect.assertions(0)

		type A = Output<{
			[k: string]: Number
		}>
		$Assert<IsIdentical<A, { [k: string]: number }>>()

		type B = Output<{
			[k in string]: Number
		}>
		$Assert<IsIdentical<B, { [k: string]: number }>>()
	})

	it('generic', () => {
		expect.assertions(0)

		type C = Output<Schemable>
		$Assert<IsIdentical<C, unknown>>()
	})

	interface IDocTI {
		publicOnCreation: { id?: never; a: 1 }
		public: { id?: never }
	}

	it('generic - Omit', <TI extends IDocTI>() => {
		expect.assertions(0)

		type IntrinsicFields = { __voltiso?: { numRefs: number } }
		$Assert.is<IntrinsicFields, InferableObject>()

		type OmitId<T> = T extends unknown
			? {
					[k in keyof T]: T[k]
			  }
			: never

		type A = OmitId<Output<TI['publicOnCreation']> & IntrinsicFields>

		$Assert.is<A, InferableObject>()
		$Assert.is<A, Schemable>()
	})

	it('intersection', () => {
		const a = {
			a: s.number,
		}

		const b = {
			b: s.number.optional,
		}

		type A = Output<typeof a & typeof b>
		$Assert<IsIdentical<A, { a: number; b?: number }>>()
	})

	it('arrays - complex', <S extends (ITuple | IArray) & ISchema>() => {
		expect.assertions(0)

		$Assert.is<Output<(ITuple | IArray) & ISchema>, readonly unknown[]>()

		$Assert.is<$Output<S>, readonly unknown[]>()

		$Assert.is<never[], Output<(ITuple | IArray) & ISchema>>()

		// Assert.is<never[], [1, 2, 3]>()
		// Assert.is<never[], GetType<S>>()
	})
})
