// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '@voltiso/util'

import type { CustomUnknownObject, UnknownObjectOptions } from '~'
import type * as s from '~/custom-schemas/index'

describe('object', () => {
	it('generic', <O extends Partial<UnknownObjectOptions>>() => {
		expect.assertions(0)

		Assert.is<CustomUnknownObject<O>, s.IUnknownObject>()
		Assert.is<typeof s.object, s.IUnknownObject>()
	})
})
