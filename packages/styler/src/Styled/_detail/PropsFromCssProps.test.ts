// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '@voltiso/util'

import type { IndexedCssPropsSingle } from '~/_/CssProps'
import type { Props } from '~/react-types'

import type { PropsFromCssProps } from './PropsFromCssProps'

describe('PropsFromCssProps', () => {
	it('generic', <CP extends IndexedCssPropsSingle>() => {
		expect.assertions(0)

		Assert.is<PropsFromCssProps<CP>, Props>()
	})

	it('type', () => {
		expect.assertions(0)

		type A = PropsFromCssProps<IndexedCssPropsSingle>
		Assert.is<A, Props>()
	})
})
