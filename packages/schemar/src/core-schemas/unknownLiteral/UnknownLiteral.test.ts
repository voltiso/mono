// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import { $Assert } from '@voltiso/util'

import type {
	CustomUnknownLiteral,
	IUnknownLiteral,
	Schema,
	SchemaLike,
	UnknownLiteralOptions,
} from '~'

describe('UnknownLiteral', () => {
	it('generic', <O extends Partial<UnknownLiteralOptions>>() => {
		expect.assertions(0)

		$Assert.is<CustomUnknownLiteral<O>, SchemaLike>()
		$Assert.is<CustomUnknownLiteral<O>, Schema>()
		$Assert.is<CustomUnknownLiteral<O>, Schema>()
		$Assert.is<CustomUnknownLiteral<O>, IUnknownLiteral>()
	})
})
