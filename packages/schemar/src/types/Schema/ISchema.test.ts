// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '@voltiso/util'

import type { CustomSchema, CustomSchema$ } from '~'

import type { $$Schema, ISchema, ISchema$, SchemaLike } from './ISchema'
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

		//

		$Assert.is<keyof CustomSchema$, keyof ISchema$>()
		$Assert.is<keyof ISchema$, keyof CustomSchema$>()

		$Assert.is<keyof CustomSchema, keyof ISchema>()
		$Assert.is<keyof ISchema, keyof CustomSchema>()
	})
})
