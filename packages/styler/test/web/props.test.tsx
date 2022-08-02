// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { screen } from '@testing-library/react'

import { style } from '~'

import { renderApp } from './common'

describe('props', () => {
	it('makes mandatory props optional', () => {
		expect.hasAssertions()

		const Button = style('button')
			.newRequiredProps({ p: 'blue' })
			.css(p => ({ color: p.p }))

		// @ts-expect-error p is required
		;<Button />

		const Button2 = Button.props({ p: 'red' })

		// now p is optional
		renderApp(<Button2 />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			color: 'red',
		})

		// override red color
		renderApp(<Button2 p='blue'>a</Button2>)

		expect(screen.getByText('a')).toHaveStyle({ color: 'blue' })
	})
})
