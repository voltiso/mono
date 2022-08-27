// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { screen } from '@testing-library/react'
import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'
import type { Property } from 'csstype'
import type { ComponentProps } from 'react'

import { style } from '~'

import { renderApp } from './common'

describe('newCssProps', () => {
	it('single boolean prop', () => {
		expect.hasAssertions()

		const Button = style('button').newCssProp('red', { color: 'red' })
		;<Button /> // check if optional
		renderApp(<Button red />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			color: 'red',
		})
	})

	it('single boolean prop - curried', () => {
		expect.hasAssertions()

		const Button = style.newCssProp('red', { color: 'red' })('button')
		;<Button /> // check if optional
		renderApp(<Button red />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			color: 'red',
		})
	})

	it('single boolean prop - function', () => {
		expect.hasAssertions()

		const Button = style('button').newCssProp('red', () => ({ color: 'red' }))
		;<Button /> // check if optional
		renderApp(<Button red />)

		type Red = ComponentProps<typeof Button>['red']
		Assert<IsIdentical<Red, boolean | undefined>>()

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			color: 'red',
		})
	})

	it('single boolean prop - function (false)', () => {
		expect.hasAssertions()

		const Button = style('button').newCssProp('red', () => ({ color: 'red' }))
		;<Button /> // check if optional
		renderApp(<Button red={false} />)

		type Red = ComponentProps<typeof Button>['red']
		Assert<IsIdentical<Red, boolean | undefined>>()

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			color: 'ButtonText',
		})
	})

	it('single custom prop - optional', () => {
		expect.hasAssertions()

		const Button = style('button').newCssProp(
			'myColor',
			(c: Property.Color) => ({ color: c }),
		)
		// @ts-expect-error myColor is required
		;<Button />
		renderApp(<Button myColor='green' />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			color: 'green',
		})
	})

	it('single custom prop - optional - curried', () => {
		expect.hasAssertions()

		const Button = style.newCssProp('myColor', (c?: Property.Color) => ({
			color: c,
		}))('button')
		renderApp(<Button myColor='green' />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			color: 'green',
		})
	})

	it('multiple props', () => {
		expect.hasAssertions()

		const Button = style('button').newCssProps({
			red: { color: 'red' },

			mx: (x: number) => ({
				marginLeft: `${x}px`,
				marginRight: `${x}px`,
			}),

			f: () => ({
				display: 'flex',
			}),
		})
		;<Button /> // check if optional
		renderApp(
			<Button
				red
				mx={123}
				f
			/>,
		)

		type Red = ComponentProps<typeof Button>['red']
		Assert<IsIdentical<Red, boolean | undefined>>()

		type F = ComponentProps<typeof Button>['f']
		Assert<IsIdentical<F, boolean | undefined>>()

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			color: 'red',
			marginLeft: '123px',
			marginRight: '123px',
			display: 'flex',
		})
	})

	it('multiple boolean props (false)', () => {
		expect.hasAssertions()

		const Button = style('button').newCssProps({
			red: { color: 'red' },

			f: () => ({
				display: 'flex',
			}),
		})

		renderApp(
			<Button
				red={false}
				f={false}
			/>,
		)

		type Red = ComponentProps<typeof Button>['red']
		Assert<IsIdentical<Red, boolean | undefined>>()

		type F = ComponentProps<typeof Button>['f']
		Assert<IsIdentical<F, boolean | undefined>>()

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			color: 'ButtonText',
			display: 'inline-block',
		})
	})

	it('has priority over css if prop is more outer', () => {
		expect.hasAssertions()

		const Button = style('button')
			.newCssProps({
				red: { color: 'red' },
			})
			.css({ color: 'blue' })

		// check if optional
		;<Button />

		renderApp(<Button red />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			color: 'red',
		})
	})

	it('css has priority if set more outer', () => {
		expect.hasAssertions()

		const Button = style('button').newCssProp('red', { color: 'red' })

		// check if optional
		;<Button />

		renderApp(
			<Button
				red
				css={{ color: 'blue' }}
			/>,
		)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			color: 'blue',
		})
	})

	it('css has priority if set more outer #2', () => {
		expect.hasAssertions()

		const Button = style('button').newCssProps({
			/** Desc */
			red: { color: 'red' },
		})

		// check if optional
		;<Button />

		renderApp(
			<Button
				red
				css={{ color: 'blue' }}
			/>,
		)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			color: 'blue',
		})
	})
})
