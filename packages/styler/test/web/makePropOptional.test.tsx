// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'
import type { ComponentProps } from 'react'

import { style } from '~'

describe('makePropOptional', () => {
	it('works (type-only)', () => {
		expect.assertions(0)

		const Img = style('img').makePropsRequired('alt').makePropsOptional('alt')

		;() => <Img />

		type A = ComponentProps<'img'>['alt']
		$Assert<IsIdentical<A, string | undefined>>()

		type B = ComponentProps<typeof Img>['alt']
		$Assert<IsIdentical<B, string | undefined>>()
	})
})
