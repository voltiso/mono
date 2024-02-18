// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type {
	$$Schemable,
	CustomSchema,
	CustomSchema$,
	ImplicitSchemaInferrer$,
	Schema,
	Schema$,
	Schemable,
	SchemaOptions,
	Unknown,
} from '~'

const schema = (() => {}) as unknown as ImplicitSchemaInferrer$
const unknown = 0 as unknown as Unknown

describe('CustomSchema', () => {
	it('generic', <O extends Partial<SchemaOptions>>() => {
		expect.assertions(0)

		$Assert.is<keyof CustomSchema<O>, keyof Schema>()
		$Assert.is<keyof Schema, keyof CustomSchema<O>>()

		$Assert.is<CustomSchema<O>, Schema>()
		$Assert.is<CustomSchema<O>, Schemable>()
		$Assert.is<CustomSchema<O>, $$Schemable>()
	})

	it('type', () => {
		expect.assertions(0)

		type MySchema = CustomSchema$<{ Output: Date; Input: Date }>

		type X = MySchema['isReadonly']
		$Assert<IsIdentical<X, false>>()

		type A = MySchema['optional']

		$Assert<
			IsIdentical<
				A,
				CustomSchema$<{
					isOptional: true
					Output: Date
					Input: Date
				}>
			>
		>()

		type AA = A['Output']
		$Assert<IsIdentical<AA, Date>>()

		type BB = A['isReadonly']
		$Assert<IsIdentical<BB, false>>()
	})

	it('type - index signatures', () => {
		type A = Schema$<{ a: 1 }>
		type AA = CustomSchema$<{ Output: { a: 1 }; Input: { a: 1 } }>

		type B = Schema$<{ [k: string]: unknown }>
		type BB = CustomSchema$<{
			Output: { [k: string]: unknown }
			Input: { [k: string]: unknown }
		}>

		// $Assert.is<A, B>() // 1.5s
		$Assert.is<AA, BB>()
		// $Assert.is<A, BB>() // 1s
		// $Assert.is<AA, B>() // 1.1s

		$Assert.is<A['Output'], B['Output']>()
		// $Assert.is<_<A>, B>() // 2.2s
		// $Assert.is<A['name'], B['name']>()
		// $Assert.is<A, _<B>>() // ! oops

		// $Assert.is<AA, B>() // 3.4s
	})

	it('type - inside object', () => {
		expect.assertions(0)

		const mySchema = schema({
			field: unknown as unknown as CustomSchema$<{ Output: Date; Input: Date }>,

			optionalField: unknown as unknown as CustomSchema$<{
				Output: Date
				Input: Date
			}>['optional'],

			readonlyField: unknown as unknown as CustomSchema$<{
				Output: Date
				Input: Date
			}>['readonly'],
		})
		type MySchema = typeof mySchema.Output

		$Assert<
			IsIdentical<
				MySchema,
				{
					field: Date
					readonly readonlyField: Date
					optionalField?: Date
				}
			>
		>()
	})
})
