// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { screen } from '@testing-library/react'

import { style } from '~'

import { renderApp } from './common'

describe('defaults', () => {
	it('prop has priority', () => {
		expect.hasAssertions()

		const Button = style('button')
			.newProp('x', 'red')
			.css(p => ({ color: p.x }))
			.prop('x', 'blue')

		renderApp(<Button />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			color: 'blue',
		})
	})
})
