// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '@voltiso/util'

import type { UnknownLiteralOptions } from './_/UnknownLiteralOptions.js'
import type { CustomUnknownLiteral } from './CustomUnknownLiteral.js'
import type { IUnknownLiteral } from './IUnknownLiteral.js'

describe('UnknownLiteral', () => {
	it('generic', <O extends UnknownLiteralOptions>() => {
		expect.assertions(0)

		Assert.is<IUnknownLiteral<O>, IUnknownLiteral>()
		Assert.is<CustomUnknownLiteral<O>, IUnknownLiteral<O>>()
		Assert.is<CustomUnknownLiteral<O>, IUnknownLiteral>()
	})
})
