// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'
import type { ComponentProps } from 'react'

import { style } from '~'

describe('makePropRequired', () => {
	it('works (type-only)', () => {
		expect.assertions(0)

		const Img = style('img').makePropsRequired('alt')

		// @ts-expect-error alt is required
		;() => <Img />

		type A = ComponentProps<'img'>['alt']
		$Assert<IsIdentical<A, string | undefined>>()

		type B = ComponentProps<typeof Img>['alt']
		$Assert<IsIdentical<B, string>>()
	})
})
