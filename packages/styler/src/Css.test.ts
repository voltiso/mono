// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '@voltiso/util'

import type { Css } from '~/Css'

describe('Css', () => {
	it('simple', () => {
		expect.assertions(0)

		const a = {
			height: '100vh',
		} as const

		Assert.is<typeof a, Css>()
	})

	it('allows arrays', () => {
		expect.assertions(0)

		const a = {
			height: ['100vh', '-webkit-fill-available'],
		} as const

		Assert.is<typeof a, Css>()
	})
})
