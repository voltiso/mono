// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	CustomUnknownObject,
	IUnknownObject,
	UnknownObject,
	UnknownObjectOptions,
} from '@voltiso/schemar.types'
import { $Assert } from '@voltiso/util'

describe('object', () => {
	it('generic', <O extends Partial<UnknownObjectOptions>>() => {
		expect.assertions(0)

		$Assert.is<CustomUnknownObject<O>, IUnknownObject>()
	})

	it('type', () => {
		expect.assertions(0)

		$Assert.is<UnknownObject, IUnknownObject>()
	})
})
