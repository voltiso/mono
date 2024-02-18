// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { style } from '~'

describe('curried', () => {
	it('simple', () => {
		expect.assertions(0)

		//
		;() => style.css({ color: 'red' })('button')
	})

	it('new props (mandatory)', () => {
		expect.assertions(0)

		const myStyle = style.newProps({ red: false }).css(p => ({
			color: p.red ? 'red' : undefined,
		}))
		const Button = myStyle('button')

		//
		;() => <Button />
	})

	it('new props (optional & present)', () => {
		expect.assertions(0)

		//
		;() =>
			style.newProps({ red: false as boolean | undefined }).css(p => ({
				color: p.red ? 'red' : undefined,
			}))('button')
	})

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
