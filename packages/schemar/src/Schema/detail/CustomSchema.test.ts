// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type {
	$$Schema,
	$$Schemable,
	CustomSchema,
	CustomSchema$,
	ISchema,
	Schemable,
	SchemaOptions,
	SimpleSchema,
	SimpleSchema$,
} from '~'
import { schema, unknown } from '~'

describe('CustomSchema', () => {
	it('generic', <O extends Partial<SchemaOptions>>() => {
		$Assert.is<CustomSchema<O>, $$Schemable>()
		$Assert.is<CustomSchema<O>, $$Schema>()
		$Assert.is<CustomSchema<O>, ISchema>() // ! too deep
		$Assert.is<CustomSchema<O>, Schemable>() // ! too deep
	})

	it('type', () => {
		expect.assertions(0)

		type MySchema = SimpleSchema$<Date>

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
			field: unknown as unknown as SimpleSchema<Date>,
			optionalField: unknown as unknown as SimpleSchema$<Date>['optional'],
			readonlyField: unknown as unknown as SimpleSchema$<Date>['readonly'],
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
