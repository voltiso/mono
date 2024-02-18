// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { screen } from '@testing-library/react'

import { style } from '~'

import { renderApp } from './common'

describe('getAtomicStyles', () => {
	it('same class', () => {
		expect.hasAssertions()

		const Button = style('button')

		renderApp(
			<Button
				css={{
					width: 100,

					_: {
						'@media (min-width: 0px)': {
							width: 200,
						},
					},
				}}
			/>,
		)

		const button = screen.getByRole('button')

		expect(button).toHaveClass('e2U-Jg') // single class only
		// expect(button).toHaveClass('_0') // single class only
	})
})
