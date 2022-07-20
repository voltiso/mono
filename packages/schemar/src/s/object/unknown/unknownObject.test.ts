// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '@voltiso/util'

import type { RootSchemable } from '../../../schema'
import type * as s from '../..'
import type { UnknownObjectOptions } from './_/UnknownObjectOptions.js'
import type { CustomUnknownObject } from './CustomUnknownObject.js'

describe('object', () => {
	it('generic', <O extends UnknownObjectOptions>() => {
		expect.assertions(0)

		Assert.is<s.IUnknownObject<O>, s.IUnknownObject>()
		Assert.is<CustomUnknownObject<O>, s.IUnknownObject<O>>()
		Assert.is<CustomUnknownObject<O>, s.IUnknownObject>()

		Assert.is<typeof s.object, s.IUnknownObject>()
		Assert.is<typeof s.object, RootSchemable>()
	})
})
