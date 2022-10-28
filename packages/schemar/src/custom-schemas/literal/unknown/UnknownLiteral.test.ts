// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	CustomUnknownLiteral,
	ISchema,
	IUnknownLiteral,
	Schema,
	SchemaLike,
	UnknownLiteralOptions,
} from '@voltiso/schemar.types'
import { $Assert } from '@voltiso/util'

describe('UnknownLiteral', () => {
	it('generic', <O extends Partial<UnknownLiteralOptions>>() => {
		expect.assertions(0)

		$Assert.is<CustomUnknownLiteral<O>, SchemaLike>()
		$Assert.is<CustomUnknownLiteral<O>, ISchema>()
		$Assert.is<CustomUnknownLiteral<O>, Schema>()
		$Assert.is<CustomUnknownLiteral<O>, IUnknownLiteral>()
	})
})
