// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '@voltiso/util'
import { describe, expect, it } from 'vitest'

import type {
	CustomUnknownObject,
	IUnknownObject,
	UnknownObject,
	UnknownObjectOptions,
} from '~'

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
