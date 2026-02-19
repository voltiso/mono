// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { afterEach, describe, expect, it } from '@jest/globals'
// eslint-disable-next-line testing-library/no-manual-cleanup
import { cleanup, screen } from '@testing-library/react'

import { style } from '~'

import { renderApp } from './common'

// eslint-disable-next-line jest/no-hooks, jest/require-top-level-describe
afterEach(() => {
	cleanup() // required after upgrading testing library
})

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
			color: 'rgb(255, 0, 0)',
		})

		// override red color
		renderApp(<Button2 p='blue'>a</Button2>)

		expect(screen.getByText('a')).toHaveStyle({ color: 'rgb(0, 0, 255)' })
	})

	it('chains', () => {
		expect.hasAssertions()

		const Button = style('input')
			.props({ type: 'checkbox' })
			.props({ type: 'button' })

		renderApp(<Button data-testid='a' />)

		// eslint-disable-next-line testing-library/no-test-id-queries
		expect(screen.getByTestId('a')).toHaveAttribute('type', 'button')
	})

	it('chains with inline props', () => {
		expect.hasAssertions()

		const Button = style('input')
			.props({ type: 'checkbox' })
			.props({ type: 'button' })

		renderApp(<Button data-testid='a' type='radio' />)

		// eslint-disable-next-line testing-library/no-test-id-queries
		expect(screen.getByTestId('a')).toHaveAttribute('type', 'radio')
	})

	// eslint-disable-next-line jest/prefer-ending-with-an-expect
	it('does not allow unknown props', () => {
		expect.assertions(0)

		// @ts-expect-error `unknownProp` does not exist
		style('button').props({ unknownProp: 'test' })
	})
})
