// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import type { IndexedProps, Props } from '~/react-types'

import type { CssProp } from './CssProp'
import type { CssProps } from './CssProps'
import type { ICssProp } from './ICssProp'
import type { IndexedCssProps, IndexedCssPropsSingle } from './IndexedCssProps'

describe('CssProps', () => {
	it('generic', <P extends Props>() => {
		expect.assertions(0)

		Assert.is<CssProps<P>, IndexedCssProps>()
	})

	it('type', () => {
		expect.assertions(0)

		type A = CssProps<IndexedProps>
		Assert<
			IsIdentical<
				A,
				{
					[x: string]: CssProp<unknown>[]
				}
			>
		>()

		type B = IndexedCssProps
		Assert<
			IsIdentical<
				B,
				{
					[x: string]: ICssProp[]
				}
			>
		>()

		type C = IndexedCssPropsSingle
		Assert<
			IsIdentical<
				C,
				{
					[x: string]: ICssProp
				}
			>
		>()
	})
})
