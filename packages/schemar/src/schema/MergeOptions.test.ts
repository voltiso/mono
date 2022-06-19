import { Assert } from '@voltiso/ts-util/bdd'
import { CustomSchema } from './CustomSchema'
import { ISchema } from './ISchema'
import { MergeOptions } from './MergeOptions'
import { OPTIONS, SchemaOptions } from './SchemaOptions'

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
})
