// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { style } from '~'

declare module 'fela' {
	interface IStyleExtension {
		/** Center child using 'flex' */
		c: boolean
	}
}

describe('extension', () => {
	it('works', () => {
		expect.assertions(0)

		//
		;() => style.css({ c: true })('button')

		//
		;() => style('button').css({ c: true })
	})
})
