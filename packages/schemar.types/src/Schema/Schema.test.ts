// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type {
	CustomSchema,
	DefaultSchemaOptions,
	InferableReadonlyTuple,
	InferSchemaFunction,
	Input,
	Number,
	OPTIONS,
	Output,
	Schema,
	SchemaOptions,
	String,
	UnknownSchema,
} from '~'

const schema = (() => 0) as unknown as UnknownSchema
const number = (() => 0) as unknown as Number
const string = (() => 0) as unknown as String
const infer = (() => 0) as unknown as InferSchemaFunction

describe('Schema', () => {
	it('generic', <O extends SchemaOptions>() => {
		expect.assertions(0)

		$Assert.is<Schema<O>, Schema>()
	})

	it('SchemaImpl', () => {
		expect.assertions(0)

		type A = CustomSchema<DefaultSchemaOptions>['optional']['readonly']
		$Assert.is<A[OPTIONS], { isOptional: true; isReadonly: true }>()
	})

	it('works', () => {
		expect.assertions(0)

		const a = schema({ a: number(1) })

		type A = Output<typeof a>
		$Assert<IsIdentical<A, { a: 1 }>>()

		const tLiteral = [number(123), string] as const
		$Assert.is<typeof tLiteral, InferableReadonlyTuple>()

		const b = infer(tLiteral)

		type Out = Output<typeof b>
		$Assert<IsIdentical<Out, [123, string]>>()

		const c = schema([number(123), string] as const)

		$Assert<IsIdentical<Output<typeof c>, readonly [123, string]>>()
		$Assert<IsIdentical<Input<typeof c>, readonly [123, string]>>()
	})
})
