// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'

import { style } from '~'

describe('curried', () => {
	// eslint-disable-next-line jest/prefer-ending-with-an-expect
	it('simple', () => {
		expect.assertions(0)

		//
		;() => style.css({ color: 'red' })('button')
	})

	// eslint-disable-next-line jest/prefer-ending-with-an-expect
	it('new props (mandatory)', () => {
		expect.assertions(0)

		const myStyle = style.newProps({ red: false }).css(p => ({
			color: p.red ? 'red' : undefined,
		}))
		const Button = myStyle('button')

		//
		;() => <Button />
	})

	// eslint-disable-next-line jest/prefer-ending-with-an-expect
	it('new props (optional & present)', () => {
		expect.assertions(0)

		//
		;() =>
			style.newProps({ red: false as boolean | undefined }).css(p => ({
				color: p.red ? 'red' : undefined,
			}))('button')
	})

	// eslint-disable-next-line jest/prefer-ending-with-an-expect
	it('new props (optional & not present)', () => {
		expect.assertions(0)

		//
		;() =>
			style
				.css({ color: 'purple' })
				.newProps({ red: false as boolean | undefined })
				.css(p => ({
					color: p.red ? 'red' : undefined,
				}))('button')
	})
})
