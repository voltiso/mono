// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '@voltiso/util'

import type { SimpleSchema } from '../Schema'
import type { ISchema, SchemaLike } from './ISchema'

describe('ISchema', () => {
	it('generic', <T>() => {
		expect.assertions(0)

		Assert.is<SimpleSchema<T>, ISchema<T>>()
		Assert.is<SimpleSchema<T>, ISchema>()

		Assert.is<SimpleSchema<T>, SchemaLike<T>>()
		Assert.is<SimpleSchema<T>, SchemaLike>()

		Assert.is<ISchema<T>, SchemaLike<T>>()
		Assert.is<ISchema<T>, SchemaLike>()
	})
})
