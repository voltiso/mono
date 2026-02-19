// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import { $Assert } from '@voltiso/util'
import type { ForwardedRef, MutableRefObject } from 'react'

import type { IForwardedRef, IMutableRefObject } from './IForwardedRef'

describe('IForwardedRef', () => {
	// eslint-disable-next-line jest/prefer-ending-with-an-expect
	it('generic', <T>() => {
		expect.assertions(0)

		$Assert.is<ForwardedRef<T>, IForwardedRef>()
		// eslint-disable-next-line @typescript-eslint/no-deprecated
		$Assert.is<MutableRefObject<T>, IMutableRefObject>()
	})
})
