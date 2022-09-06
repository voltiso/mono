// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	CustomUnknownLiteral,
	IUnknownLiteral,
	UnknownLiteralOptions,
} from '@voltiso/schemar.types'
import { Assert } from '@voltiso/util'

describe('UnknownLiteral', () => {
	it('generic', <O extends Partial<UnknownLiteralOptions>>() => {
		expect.assertions(0)

		Assert.is<CustomUnknownLiteral<O>, IUnknownLiteral>()
	})
})
