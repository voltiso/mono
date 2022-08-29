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

	it('generic', <O extends MySchemaOptions, PO extends Partial<SchemaOptions>>() => {
		expect.assertions(0)

		type A = MergeSchemaOptions<O, PO>
		Assert.is<A, SchemaOptions>()

		Assert.is<MergeSchemaOptions<O, { isOptional: true }>, SchemaOptions>()

		const getDefault = 0 as unknown as A['getDefault']

		if (getDefault) {
			;() => getDefault()
		}
	})
})
