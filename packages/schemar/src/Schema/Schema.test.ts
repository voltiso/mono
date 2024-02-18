// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical, OPTIONS } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type {
	CustomSchemaImpl,
	InferableReadonlyTuple,
	Input,
	Output,
	Schema,
	SchemaOptions,
} from '~'
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
		$Assert.is<Schema<O>, Schema>()
	})

	it('SchemaImpl', () => {
		expect.assertions(0)

		type A = CustomSchemaImpl<SchemaOptions.Default>['optional']['readonly']
		$Assert.is<A[OPTIONS], { optional: true; readonly: true }>()
	})

	it('works', () => {
		expect.hasAssertions()

		expect(number.extends(number)).toBeTruthy()
		expect(number(1).extends(number)).toBeTruthy()

		const a = schema({ a: number(1) })

		expect(a.extends({ a: number })).toBeTruthy()

		type A = Output<typeof a>
		$Assert<IsIdentical<A, { a: 1 }>>()

		const tLiteral = [number(123), string] as const
		$Assert.is<typeof tLiteral, InferableReadonlyTuple>()

		const b = infer(tLiteral)

		expect(b.extends(array)).toBeTruthy()
		expect(b.extends(tuple(number, string))).toBeTruthy()

		$Assert<IsIdentical<Output<typeof b>, [123, string]>>()

		const c = schema([number(123), string] as const)

		expect(c.extends(array)).toBeTruthy()
		expect(c.extends(tuple(number, string))).toBeTruthy()

		$Assert<IsIdentical<Output<typeof c>, readonly [123, string]>>()
		$Assert<IsIdentical<Input<typeof c>, readonly [123, string]>>()

		const dd = readonlyTuple([123, 'test'] as const)

		expect(dd.extends(readonlyArray)).toBeTruthy()
		expect(dd.extends(array)).toBeFalsy()

		const d = schema([123, 'test'] as const)

		expect(d.extends(readonlyArray)).toBeTruthy()
		expect(d.extends(array)).toBeTruthy() // can't possibly work with readonly [] argument

		// Assert.is<GetType<ISchema<123>>, 123>()
		// Assert.is<Schema<123>['Input'], 123>()

		// Assert.is<Schema<123>['optional']['Type'], 123>()
		// Assert.is<Schema<123>['optional']['Input'], 123>()
	})
})
