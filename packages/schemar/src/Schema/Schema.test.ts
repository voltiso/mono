// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import type { GetInputType, GetOutputType } from '../GetType'
import type { InferableReadonlyTuple } from '../Inferable'
import * as s from '../custom-/index'
import type {
	DefaultSchemaOptions,
	OPTIONS,
	SchemaOptions,
} from '../SchemaOptions'
import type { Schema } from './Schema.js'
import type { CustomSchemaImpl } from './CustomSchemaImpl.js'

describe('Schema', () => {
	it('generic', <O extends SchemaOptions>() => {
		expect.assertions(0)

		Assert.is<Schema<O>, Schema>()
	})

	it('Schema_', () => {
		expect.assertions(0)

		type A = CustomSchemaImpl<DefaultSchemaOptions>['optional']['readonly']
		Assert.is<A[OPTIONS], { optional: true; readonly: true }>()
	})

	it('works', () => {
		expect.hasAssertions()

		const a = s.schema({ a: s.number(1) })

		expect(a.extends({ a: s.number })).toBeTruthy()

		type A = GetOutputType<typeof a>
		Assert<IsIdentical<A, { a: 1 }>>()

		const tLiteral = [s.number(123), s.string] as const
		Assert.is<typeof tLiteral, InferableReadonlyTuple>()

		const b = s.schema(tLiteral)

		expect(b.extends(s.array)).toBeTruthy()
		expect(b.extends(s.tuple(s.number, s.string))).toBeTruthy()

		Assert<IsIdentical<GetOutputType<typeof b>, [123, string]>>()

		const c = s.schema([s.number(123), s.string] as [s.Literal<123>, s.String])

		expect(c.extends(s.array)).toBeTruthy()
		expect(c.extends(s.tuple(s.number, s.string))).toBeTruthy()

		Assert<IsIdentical<GetOutputType<typeof c>, [123, string]>>()
		Assert<IsIdentical<GetInputType<typeof c>, [123, string]>>()

		const dd = s.readonlyTuple([123, 'test'] as const)

		expect(dd.extends(s.readonlyArray)).toBeTruthy()
		expect(dd.extends(s.array)).toBeFalsy()

		const d = s.schema([123, 'test'] as const)

		expect(d.extends(s.readonlyArray)).toBeTruthy()
		expect(d.extends(s.array)).toBeTruthy() // can't possibly work with readonly [] argument

		// Assert.is<GetType<ISchema<123>>, 123>()
		// Assert.is<Schema<123>['InputType'], 123>()

		// Assert.is<Schema<123>['optional']['Type'], 123>()
		// Assert.is<Schema<123>['optional']['InputType'], 123>()
	})
})
