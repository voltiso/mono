// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import type {
	IArray,
	InferableObject,
	ISchema,
	ITuple,
	Number,
	Schema,
	Schemable,
} from '~'
import { number } from '~'

import type { $GetOutputType, GetInputType, GetOutputType } from './GetType'

describe('GetType', () => {
	it('simple', () => {
		expect.assertions(0)

		type A = GetOutputType<Number>
		Assert<IsIdentical<A, number>>()

		type B = GetOutputType<Schema>
		Assert<IsIdentical<B, unknown>>()
	})

	it('literal', () => {
		expect.assertions(0)

		const a = {
			num: number,
		}
		type A = GetOutputType<typeof a>
		Assert<IsIdentical<A, { num: number }>>()

		const d = {
			num: number.optional,
		}
		type D = GetOutputType<typeof d>
		Assert<IsIdentical<D, { num?: number }>>()

		const e = {
			num: number.default(0),
		}
		type E = GetInputType<typeof e>
		Assert<IsIdentical<E, { num?: number | undefined }>>()

		type E2 = GetOutputType<typeof e>
		Assert<IsIdentical<E2, { num: number }>>()
	})

	it('index', () => {
		expect.assertions(0)

		type A = GetOutputType<{
			[k: string]: Number
		}>
		Assert<IsIdentical<A, { [k: string]: number }>>()

		type B = GetOutputType<{
			[k in string]: Number
		}>
		Assert<IsIdentical<B, { [k: string]: number }>>()
	})

	it('generic', () => {
		expect.assertions(0)

		type C = GetOutputType<Schemable>
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

		type A = OmitId<GetOutputType<TI['publicOnCreation']> & IntrinsicFields>

		Assert.is<A, InferableObject>()
		Assert.is<A, Schemable>()
	})

	it('intersection', () => {
		expect.assertions(0)

		const a = {
			a: number,
		}

		const b = {
			b: number.optional,
		}

		type A = GetOutputType<typeof a & typeof b>
		Assert<IsIdentical<A, { a: number; b?: number }>>()
	})

	it('arrays - complex', <S extends (ITuple | IArray) & ISchema>() => {
		expect.assertions(0)

		Assert.is<GetOutputType<(ITuple | IArray) & ISchema>, readonly unknown[]>()

		Assert.is<$GetOutputType<S>, readonly unknown[]>()

		Assert.is<never[], GetOutputType<(ITuple | IArray) & ISchema>>()

		// Assert.is<never[], [1, 2, 3]>()
		// Assert.is<never[], GetType<S>>()
	})
})
