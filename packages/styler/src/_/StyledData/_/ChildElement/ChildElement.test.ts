// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import { $Assert } from '@voltiso/util'

import type { Props } from '~/react-types'

import type { ChildElement } from './ChildElement'
import type { IChildElement } from './IChildElement'

describe('ChildElement', () => {
	it('generic', <P extends Props>() => {
		expect.assertions(0)

		$Assert.is<ChildElement<P>, IChildElement>()
	})
})
