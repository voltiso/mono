// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import type { IsIdentical, strictNullChecks } from '@voltiso/util'
import { $Assert } from '@voltiso/util'
import type { ComponentProps } from 'react'

import { style } from '../../../../src'

describe('defineProps', () => {
	it('compiler options is set', () => {
		expect.assertions(0)

		$Assert.is<strictNullChecks, false>()
	})

	it('allows undefined default', () => {
		expect.assertions(0)

		type MyProps = {
			magic?: boolean
		}

		//
		const a = style('button').defineProps<MyProps>({ magic: undefined })
		type A = Pick<ComponentProps<typeof a>, 'magic'>
		$Assert<IsIdentical<A, { magic?: boolean | undefined }>>()
	})
})
