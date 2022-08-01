// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '@voltiso/util'

import type {
	CustomUnknownLiteral,
	IUnknownLiteral,
	UnknownLiteralOptions,
} from '~'

describe('UnknownLiteral', () => {
	it('generic', <O extends Partial<UnknownLiteralOptions>>() => {
		expect.assertions(0)

		Assert.is<CustomUnknownLiteral<O>, IUnknownLiteral>()
	})
})
