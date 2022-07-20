// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import '@testing-library/jest-dom'

import { screen } from '@testing-library/react'
import { undef } from '@voltiso/util'

import { style } from '../../src'
import { renderApp } from './common'

describe('curried', () => {
	it('simple', () => {
		expect.hasAssertions()

		const Button = style.css({ color: 'red' })('button')
		renderApp(<Button />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			color: 'red',
		})
	})

	it('new props (mandatory)', () => {
		expect.hasAssertions()

		const myStyle = style.newProps({ red: false }).css(p => ({
			color: p.red ? 'red' : undef,
		}))
		const Button = myStyle('button')

		;() => <Button />

		renderApp(<Button red />)
		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			color: 'red',
		})
	})

	it('new props (optional & present)', () => {
		expect.hasAssertions()

		const Button = style
			.newProps({ red: false as boolean | undefined })
			.css(p => ({
				color: p.red ? 'red' : undef,
			}))('button')

		renderApp(<Button red />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			color: 'red',
		})
	})

	it('new props (optional & not present)', () => {
		expect.hasAssertions()

		const Button = style
			.css({ color: 'purple' })
			.newProps({ red: false as boolean | undefined })
			.css(p => ({
				color: p.red ? 'red' : undef,
			}))('button')
		renderApp(<Button />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			color: 'purple',
		})
	})
})
