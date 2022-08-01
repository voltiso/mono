// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import type { Schema, SchemaOptions } from '~'
import { schema, unknown } from '~'

import type { CustomSchema } from '.'

describe('CustomSchema', () => {
	it('generic', <_O extends Partial<SchemaOptions>>() => {
		expect.assertions(0)

		//! too deep
		// Assert.is<CustomSchema<O>, ISchema>()
	})

	it('type', () => {
		expect.assertions(0)

		type MySchema = Schema<Date>

		type X = MySchema['isReadonly']
		Assert<IsIdentical<X, false>>()

		type A = MySchema['optional']
		Assert<
			IsIdentical<
				A,
				CustomSchema<{
					Output: Date
					Input: Date
					isOptional: true
				}>
			>
		>()

		type AA = A['OutputType']
		Assert<IsIdentical<AA, Date>>()

		type BB = A['isReadonly']
		Assert<IsIdentical<BB, false>>()
	})

	it('type - inside object', () => {
		expect.assertions(0)

		const mySchema = schema({
			field: unknown as unknown as Schema<Date>,
			optionalField: unknown as unknown as Schema<Date>['optional'],
			readonlyField: unknown as unknown as Schema<Date>['readonly'],
		})
		type MySchema = typeof mySchema.OutputType

		Assert<
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
