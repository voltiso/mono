// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import { $Assert } from '@voltiso/util'

import type { Props } from '~/react-types'

import type { FunctionComponent } from './FunctionComponent'
import type { IFunctionComponent } from './IFunctionComponent'

describe('FunctionComponent', () => {
	// eslint-disable-next-line jest/prefer-ending-with-an-expect
	it('generic', <P extends Props>() => {
		expect.assertions(0)

		$Assert.is<FunctionComponent<P>, IFunctionComponent>()
	})
})
