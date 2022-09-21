// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { screen } from '@testing-library/react'

import { style } from '~'

import { renderApp } from './common'

const Div = style('div').newCustomCssProperties({
	bg: {},
})

const Button = style('button').newCssProps({
	bg: {
		backgroundColor: 'green',
	},
})

describe('bug', () => {
	it('works', () => {
		expect.hasAssertions()

		renderApp(
			<Div>
				<Button bg>test</Button>
			</Div>,
		)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({ backgroundColor: 'green' })
	})
})
