// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '@voltiso/util'

import type { CustomSchema, CustomSchema$ } from '~'

import type { $$Schema, Schema, Schema$, SchemaLike } from './ISchema'

describe('ISchema', () => {
	it('generic', <T>() => {
		expect.assertions(0)

		// $Assert.is<SimpleSchema<T>, Schema<T>>()
		$Assert.is<Schema<T>, Schema>()

		$Assert.is<Schema<T>, $$Schema>()
		$Assert.is<Schema<T>, SchemaLike<T>>()
		$Assert.is<Schema<T>, SchemaLike>()

		$Assert.is<Schema<T>, $$Schema>()
		$Assert.is<Schema<T>, SchemaLike<T>>()
		$Assert.is<Schema<T>, SchemaLike>()

		//

		$Assert.is<keyof CustomSchema$, keyof Schema$>()
		$Assert.is<keyof Schema$, keyof CustomSchema$>()

		$Assert.is<keyof CustomSchema, keyof Schema>()
		$Assert.is<keyof Schema, keyof CustomSchema>()
	})
})
