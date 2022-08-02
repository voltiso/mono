// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '@voltiso/util'

import type { IUnknownObject, object, UnknownObjectOptions } from '~'

describe('object', () => {
	it('generic', <_O extends Partial<UnknownObjectOptions>>() => {
		expect.assertions(0)

		//! too deep!
		// Assert.is<CustomUnknownObject<O>, IUnknownObject>()
	})

	it('type', () => {
		expect.assertions(0)

		Assert.is<typeof object, IUnknownObject>()
	})
})
