// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'
import type { ComponentProps } from 'react'

import { style } from '~'

describe('newProps', () => {
	it('infers prop types', () => {
		expect.assertions(0)

		const Button = style('button').newProps({
			magic: false,
		})

		type A = Pick<ComponentProps<typeof Button>, 'magic'>
		$Assert<IsIdentical<A, { magic?: boolean | undefined }>>()
	})
})
