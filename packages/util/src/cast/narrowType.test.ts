// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'
import { describe, expect, it } from '@jest/globals'

import type { IsIdentical } from '~/type'

import { narrow } from './narrowType'

describe('narrowType', () => {
	it('works #1', () => {
		expect.assertions(0)

		// @ts-expect-error should not work
		narrow('asd' as const).toType<'d'>()
	})

	it('works #2', () => {
		expect.assertions(0)

		const s = 'asd'
		const x = narrow(s).toType<'d'>()
		$Assert<IsIdentical<typeof x, 'd'>>()
	})
})
