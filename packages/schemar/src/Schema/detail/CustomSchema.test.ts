// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type {
	$$Schema,
	$$Schemable,
	CustomSchema,
	CustomSchema$,
	Schema,
	Schemable,
	SchemaOptions,
} from '~'
import { schema, unknown } from '~'

describe('CustomSchema', () => {
	it('generic', <O extends Partial<SchemaOptions>>() => {
		$Assert.is<CustomSchema<O>, $$Schemable>()
		$Assert.is<CustomSchema<O>, $$Schema>()
		$Assert.is<CustomSchema<O>, Schema>() // ! too deep
		$Assert.is<CustomSchema<O>, Schemable>() // ! too deep
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

	it('type - inside object', () => {
		const mySchema = schema({
			field: unknown as unknown as CustomSchema<{ Output: Date; Input: Date }>,

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
