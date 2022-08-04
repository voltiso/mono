import { Assert } from '@voltiso/util'
import type { Css } from '~/Css'

describe('Css', () => {
	it('simple', () => {
		const a = {
			height: '100vh',
		} as const

		Assert.is<typeof a, Css>()
	})

	it('allows arrays', () => {
		const a = {
			height: ['100vh', '-webkit-fill-available'],
		} as const

		Assert.is<typeof a, Css>()
	})
})
