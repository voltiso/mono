// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '@voltiso/util'

import type { CustomSchema } from './CustomSchema.js'
import type { ISchema } from './ISchema.js'
import type { MergeOptions, OptionalOptions } from './MergeOptions.js'
import type { OPTIONS, SchemaOptions } from './SchemaOptions.js'

describe('MergeOptions', () => {
	interface MySchemaOptions extends SchemaOptions {
		_out: number
		test: 123
	}

	it('generic', <O extends MySchemaOptions>() => {
		expect.assertions(0)

		type MySchema = CustomSchema<O>

		Assert.is<MergeOptions<MySchema, { optional: true }>, ISchema[OPTIONS]>()
	})

	it('generic 2', <S extends ISchema>() => {
		expect.assertions(0)

		type A = MergeOptions<S, { optional: true }>

		Assert.is<A, SchemaOptions>()

		type B = OptionalOptions<S>
		Assert.is<B, SchemaOptions>()
	})
})
