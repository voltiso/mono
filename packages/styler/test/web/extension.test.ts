// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { style } from '~'

declare module '~' {
	interface CssExtension {
		/** Center child using 'flex' */
		c?: boolean | undefined
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
