// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	DefaultSchemaOptions,
	InferableReadonlyTuple,
	InputType,
	OPTIONS,
	OutputType,
	Schema,
	SchemaOptions,
} from '@voltiso/schemar.types'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type { CustomSchemaImpl } from '~'
import {
	array,
	infer,
	number,
	readonlyArray,
	readonlyTuple,
	schema,
	string,
	tuple,
} from '~'

describe('Schema', () => {
	it('generic', <O extends SchemaOptions>() => {
		expect.assertions(0)

		$Assert.is<Schema<O>, Schema>()
	})

	it('SchemaImpl', () => {
		expect.assertions(0)

		type A = CustomSchemaImpl<DefaultSchemaOptions>['optional']['readonly']
		$Assert.is<A[OPTIONS], { optional: true; readonly: true }>()
	})

	it('works', () => {
		expect.hasAssertions()

		expect(number.extends(number)).toBeTruthy()
		expect(number(1).extends(number)).toBeTruthy()

		const a = schema({ a: number(1) })

		expect(a.extends({ a: number })).toBeTruthy()

		type A = OutputType<typeof a>
		$Assert<IsIdentical<A, { a: 1 }>>()

		const tLiteral = [number(123), string] as const
		$Assert.is<typeof tLiteral, InferableReadonlyTuple>()

		const b = infer(tLiteral)

		expect(b.extends(array)).toBeTruthy()
		expect(b.extends(tuple(number, string))).toBeTruthy()

		$Assert<IsIdentical<OutputType<typeof b>, [123, string]>>()

		const c = schema([number(123), string] as const)

		expect(c.extends(array)).toBeTruthy()
		expect(c.extends(tuple(number, string))).toBeTruthy()

		$Assert<IsIdentical<OutputType<typeof c>, readonly [123, string]>>()
		$Assert<IsIdentical<InputType<typeof c>, readonly [123, string]>>()

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
