// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '@voltiso/util'

import type { IndexedCssPropsSingle } from '~/_/CssProps'
import type { Props } from '~/react-types'

import type { PropsFromCssProps } from './PropsFromCssProps'

describe('PropsFromCssProps', () => {
	it('generic', <CP extends IndexedCssPropsSingle<CssProps>, CssProps extends
		object>() => {
		expect.assertions(0)

		$Assert.is<PropsFromCssProps<CP, CssProps>, Props>()
	})

	it('type', <CssProps extends object>() => {
		expect.assertions(0)

		type A = PropsFromCssProps<IndexedCssPropsSingle<CssProps>, CssProps>
		$Assert.is<A, Props>()
	})
})
