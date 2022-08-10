// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '@voltiso/util'

import type { MergeSchemaOptions } from './MergeSchemaOptions'
import type { SchemaOptions } from './SchemaOptions'

describe('MergeSchemaOptions', () => {
	interface MySchemaOptions extends SchemaOptions {
		Output: number
		test: 123
	}

	it('generic', <O extends MySchemaOptions, _OO extends Partial<SchemaOptions>>() => {
		expect.assertions(0)

		Assert.is<MergeSchemaOptions<O, { optional: true }>, SchemaOptions>()
		// Assert.is<MergeSchemaOptions<O, OO>, SchemaOptions>()

		// type A = MergeSchemaOptions<O, OO>['isOptional']
		// Assert.is<A, boolean>()
	})
})
