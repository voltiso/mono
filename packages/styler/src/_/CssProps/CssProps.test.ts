// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type { IndexedProps, Props } from '~/react-types'

import type { CssProp } from './CssProp'
import type { CssProps } from './CssProps'
import type { ICssProp } from './ICssProp'
import type { IndexedCssProps, IndexedCssPropsSingle } from './IndexedCssProps'

describe('CssProps', () => {
	it('generic', <P extends Props, CustomCss extends object>() => {
		expect.assertions(0)

		$Assert.is<CssProps<P, CustomCss>, IndexedCssProps<CustomCss>>()
	})

	it('type', <CustomCss extends object>() => {
		expect.assertions(0)

		type A = CssProps<IndexedProps, CustomCss>
		$Assert<
			IsIdentical<
				A,
				{
					[x: string]: CssProp<unknown, CustomCss>[]
				}
			>
		>()

		type B = IndexedCssProps<CustomCss>
		$Assert<
			IsIdentical<
				B,
				{
					[x: string]: ICssProp<CustomCss>[]
				}
			>
		>()

		type C = IndexedCssPropsSingle<CustomCss>
		$Assert<
			IsIdentical<
				C,
				{
					[x: string]: ICssProp<CustomCss>
				}
			>
		>()
	})
})
