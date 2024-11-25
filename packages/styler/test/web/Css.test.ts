// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import { $Assert, $Is } from '@voltiso/util'

import type { Css } from '~'

describe('Css', () => {
	it('simple', () => {
		expect.assertions(0)

		const more = {} as Css

		const a = {
			height: '100vh',
			opacity: 0,

			animationName: {
				to: {
					opacity: 1,
					transform: 'unset',
				},
			},

			...more,
		} as const

		$Assert.is<typeof a, Css>()

		// const b = {
		// 	// ...a,
		// 	customPropertyA: 1,
		// }

		// $Assert($Is<typeof b>().not.subtypeOf<Css>())

		// $Assert.is<typeof b, Css<{ customPropertyA: number }>>()
	})

	it('allows arrays', () => {
		expect.assertions(0)

		const a = {
			height: ['100vh', '-webkit-fill-available'],
		} as const

		$Assert.is<typeof a, Css>()
	})

	it('nested', () => {
		expect.assertions(0)

		const a = {
			_: {
				'@media(...)': {
					marginX: 1,
				},
			},
		} as const

		$Assert($Is<typeof a>().not.subtypeOf<Css>())

		$Assert.is<typeof a, Css<{ marginX: number }>>()
	})
})
