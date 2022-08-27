// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { screen } from '@testing-library/react'

import { style } from '~'

import { renderApp } from './common'

describe('cssProps', () => {
	it('works', () => {
		expect.hasAssertions()

		const Button = style('button').newCustomCssProperty('black', {
			color: 'black',
			backgroundColor: 'black',
		})

		//
		;<Button /> // check if optional

		renderApp(
			<Button
				css={{
					color: 'red',
					black: true,
				}}
			/>,
		)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			color: 'red',
			backgroundColor: 'black',
		})
	})

	it('works - multiple at once', () => {
		expect.hasAssertions()

		const Button = style('button').newCustomCssProperties({
			/** Description here! */
			black: {
				color: 'black',
			},
		})

		//
		;() => <Button /> // check if optional

		// @ts-expect-error no arrays for custom properties!
		;() => <Button css={{ black: [true] }} />

		renderApp(
			<Button
				css={{
					color: ['blue', 'red'],
					black: true,
				}}
			/>,
		)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			color: 'red',
		})
	})
})
