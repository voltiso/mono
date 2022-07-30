// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '@voltiso/util'

import type { SchemaOptions } from '~'

import type { CustomSchema, ISchema } from '.'

describe('CustomSchema', () => {
	it('generic', <O extends Partial<SchemaOptions>>() => {
		expect.assertions(0)

		Assert.is<CustomSchema<O>, ISchema>()
	})
})
