// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _, IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type {
	$$Schemable,
	CustomSchema,
	ISchema,
	Schema,
	Schemable,
	SchemaInferrer,
	SchemaOptions,
	SimpleSchema,
	Unknown,
} from '~'

const schema = (() => {}) as unknown as SchemaInferrer
const unknown = 0 as unknown as Unknown

describe('CustomSchema', () => {
	it('generic', <O extends Partial<SchemaOptions>>() => {
		expect.assertions(0)

		$Assert.is<keyof CustomSchema<O>, keyof ISchema>()
		$Assert.is<keyof ISchema, keyof CustomSchema<O>>()

		$Assert.is<CustomSchema<O>, Schema>()
		$Assert.is<CustomSchema<O>, Schemable>()
		$Assert.is<CustomSchema<O>, $$Schemable>()
	})

	it('type', () => {
		expect.assertions(0)

		type MySchema = SimpleSchema<Date>

		type X = MySchema['isReadonly']
		$Assert<IsIdentical<X, false>>()

		type A = MySchema['optional']

		$Assert<
			IsIdentical<
				A,
				CustomSchema<{
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
		type A = SimpleSchema<{ a: 1 }>
		type AA = CustomSchema<{ Output: { a: 1 }; Input: { a: 1 } }>

		type B = SimpleSchema<{ [k: string]: unknown }>
		type BB = CustomSchema<{
			Output: { [k: string]: unknown }
			Input: { [k: string]: unknown }
		}>

		$Assert.is<A, B>()
		$Assert.is<AA, BB>()
		$Assert.is<A, BB>()
		$Assert.is<AA, B>()

		$Assert.is<A['Output'], B['Output']>()
		$Assert.is<_<A>, B>()
		$Assert.is<A['name'], B['name']>()
		// $Assert.is<A, _<B>>() // ! oops

		$Assert.is<AA, B>()
	})

	it('type - inside object', () => {
		expect.assertions(0)

		const mySchema = schema({
			field: unknown as unknown as SimpleSchema<Date>,
			optionalField: unknown as unknown as SimpleSchema<Date>['optional'],
			readonlyField: unknown as unknown as SimpleSchema<Date>['readonly'],
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
