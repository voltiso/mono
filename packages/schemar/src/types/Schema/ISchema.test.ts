// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '@voltiso/util'

import type { $$Schema, ISchema, SchemaLike } from './ISchema'
import type { SimpleSchema } from './Schema'

describe('ISchema', () => {
	it('generic', <T>() => {
		expect.assertions(0)

		$Assert.is<SimpleSchema<T>, ISchema<T>>()
		$Assert.is<SimpleSchema<T>, ISchema>()

		$Assert.is<SimpleSchema<T>, $$Schema>()
		$Assert.is<SimpleSchema<T>, SchemaLike<T>>()
		$Assert.is<SimpleSchema<T>, SchemaLike>()

		$Assert.is<ISchema<T>, $$Schema>()
		$Assert.is<ISchema<T>, SchemaLike<T>>()
		$Assert.is<ISchema<T>, SchemaLike>()
	})
})
