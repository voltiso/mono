// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '@voltiso/util'
import type { ForwardedRef, MutableRefObject } from 'react'

import type { IForwardedRef, IMutableRefObject } from './IForwardedRef'

describe('IForwardedRef', () => {
	it('generic', <T>() => {
		expect.assertions(0)

		$Assert.is<ForwardedRef<T>, IForwardedRef>()
		$Assert.is<MutableRefObject<T>, IMutableRefObject>()
	})
})
