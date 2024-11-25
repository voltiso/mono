// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import { $Assert } from '@voltiso/util'

import type { CustomSchema, CustomSchema$ } from '~'
import type * as s from '~/base-schemas'

import type { $$Schema, Schema, SchemaLike } from './ISchema'

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

		// $Assert.is<keyof CustomSchema$<{}>, keyof Schema$>()
		// $Assert.is<keyof Schema$, keyof CustomSchema$<{}>>()

		$Assert.is<keyof CustomSchema, keyof Schema>()
		$Assert.is<keyof Schema, keyof CustomSchema>()

		//

		// type A = s.String$['optional']['optional']['implicitFix']
		// type B = Schema$['optional']['optional']['implicitFix']

		$Assert.is<s.String, Schema>()
		$Assert.is<s.String$, Schema>()
		// $Assert.is<s.String$, Schema$>()
		// $Assert.is<typeof s.string.optional, Schema$>()

		$Assert.is<s.String, CustomSchema>()
		$Assert.is<s.String$, CustomSchema>()
		$Assert.is<s.String$, CustomSchema$<{}>>()
		$Assert.is<typeof s.string.optional, CustomSchema<{ isOptional: true }>>()
		$Assert.is<typeof s.string.optional, CustomSchema$<{ isOptional: true }>>()
	})
})
