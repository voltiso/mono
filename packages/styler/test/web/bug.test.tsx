// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
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

		expect(button).toHaveStyle({ backgroundColor: 'rgb(0, 128, 0)' })
	})
})
