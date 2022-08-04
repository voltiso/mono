// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { UnknownLiteralOptions } from '~'

describe('UnknownLiteral', () => {
	it('generic', <_O extends Partial<UnknownLiteralOptions>>() => {
		expect.assertions(0)

		// Assert.is<CustomUnknownLiteral<O>, IUnknownLiteral>() // ! too deep...
	})
})
