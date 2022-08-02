// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import type {
	CustomSchemaImpl,
	DefaultSchemaOptions,
	GetInputType,
	GetOutputType,
	InferableReadonlyTuple,
	Literal,
	OPTIONS,
	SchemaOptions,
	String,
} from '~'
import {
	array,
	number,
	readonlyArray,
	readonlyTuple,
	schema,
	string,
	tuple,
} from '~'

describe('Schema', () => {
	it('generic', <_O extends SchemaOptions>() => {
		expect.assertions(0)

		//! too deep...
		// Assert.is<Schema<O>, Schema>()
	})

	it('SchemaImpl', () => {
		expect.assertions(0)

		type A = CustomSchemaImpl<DefaultSchemaOptions>['optional']['readonly']
		Assert.is<A[OPTIONS], { optional: true; readonly: true }>()
	})

	// eslint-disable-next-line jest/no-commented-out-tests
	// it('type - optional', () => {
	// 	expect.assertions(0)

	// 	type A = s.Schema<readonly unknown[]>
	// 	type AA = A['optional']

	// 	Assert<
	// 		IsIdentical<
	// 			AA,
	// 			s.CustomTypeOnly<{
	// 				Output: readonly unknown[]
	// 				Input: readonly unknown[]
	// 				isOptional: true
	// 			}>
	// 		>
	// 	>()
	// })

	it('works', () => {
		expect.hasAssertions()

		const a = schema({ a: number(1) })

		expect(a.extends({ a: number })).toBeTruthy()

		type A = GetOutputType<typeof a>
		Assert<IsIdentical<A, { a: 1 }>>()

		const tLiteral = [number(123), string] as const
		Assert.is<typeof tLiteral, InferableReadonlyTuple>()

		const b = schema(tLiteral)

		expect(b.extends(array)).toBeTruthy()
		expect(b.extends(tuple(number, string))).toBeTruthy()

		Assert<IsIdentical<GetOutputType<typeof b>, [123, string]>>()

		const c = schema([number(123), string] as [Literal<123>, String])

		expect(c.extends(array)).toBeTruthy()
		expect(c.extends(tuple(number, string))).toBeTruthy()

		Assert<IsIdentical<GetOutputType<typeof c>, [123, string]>>()
		Assert<IsIdentical<GetInputType<typeof c>, [123, string]>>()

		const dd = readonlyTuple([123, 'test'] as const)

		expect(dd.extends(readonlyArray)).toBeTruthy()
		expect(dd.extends(array)).toBeFalsy()

		const d = schema([123, 'test'] as const)

		expect(d.extends(readonlyArray)).toBeTruthy()
		expect(d.extends(array)).toBeTruthy() // can't possibly work with readonly [] argument

		// Assert.is<GetType<ISchema<123>>, 123>()
		// Assert.is<Schema<123>['InputType'], 123>()

		// Assert.is<Schema<123>['optional']['Type'], 123>()
		// Assert.is<Schema<123>['optional']['InputType'], 123>()
	})
})
