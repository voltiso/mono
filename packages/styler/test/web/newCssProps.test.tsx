// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { afterEach, describe, expect, it } from '@jest/globals'
// eslint-disable-next-line testing-library/no-manual-cleanup
import { cleanup, screen } from '@testing-library/react'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'
import type { Property } from 'csstype'
import type { ComponentProps } from 'react'

import { style } from '~'

import { renderApp } from './common'

// eslint-disable-next-line jest/no-hooks, jest/require-top-level-describe
afterEach(() => {
	cleanup() // required after upgrading testing library
})

describe('newCssProps', () => {
	it('single boolean prop', () => {
		expect.hasAssertions()

		const Button = style('button').newCssProp('red', { color: 'red' })
		;<Button /> // check if optional
		renderApp(<Button red />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			color: 'rgb(255, 0, 0)',
		})
	})

	it('single boolean prop - curried', () => {
		expect.hasAssertions()

		const Button = style.newCssProp('red', { color: 'red' })('button')
		;<Button /> // check if optional
		renderApp(<Button red />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			color: 'rgb(255, 0, 0)',
		})
	})

	it('single boolean prop - function', () => {
		expect.hasAssertions()

		const Button = style('button').newCssProp('red', () => ({ color: 'red' }))
		;<Button /> // check if optional
		renderApp(<Button red />)

		type Red = ComponentProps<typeof Button>['red']
		$Assert<IsIdentical<Red, boolean | undefined>>()

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			color: 'rgb(255, 0, 0)',
		})
	})

	it('single boolean prop - function (false)', () => {
		expect.hasAssertions()

		const Button = style('button').newCssProp('red', () => ({ color: 'red' }))
		;<Button /> // check if optional
		renderApp(<Button red={false} />)

		type Red = ComponentProps<typeof Button>['red']
		$Assert<IsIdentical<Red, boolean | undefined>>()

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
			color: 'rgb(0, 128, 0)',
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
			color: 'rgb(0, 128, 0)',
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
		renderApp(<Button red mx={123} f />)

		type Red = ComponentProps<typeof Button>['red']
		$Assert<IsIdentical<Red, boolean | undefined>>()

		type F = ComponentProps<typeof Button>['f']
		$Assert<IsIdentical<F, boolean | undefined>>()

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			color: 'rgb(255, 0, 0)',
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

		renderApp(<Button red={false} f={false} />)

		type Red = ComponentProps<typeof Button>['red']
		$Assert<IsIdentical<Red, boolean | undefined>>()

		type F = ComponentProps<typeof Button>['f']
		$Assert<IsIdentical<F, boolean | undefined>>()

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
			color: 'rgb(255, 0, 0)',
		})
	})

	it('css has priority if set more outer', () => {
		expect.hasAssertions()

		const Button = style('button').newCssProp('red', { color: 'red' })

		// check if optional
		;<Button />

		renderApp(<Button red css={{ color: 'blue' }} />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			color: 'rgb(0, 0, 255)',
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

		renderApp(<Button red css={{ color: 'blue' }} />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			color: 'rgb(0, 0, 255)',
		})
	})

	it('custom css', () => {
		expect.hasAssertions()

		const Button = style('button')
			.newCustomCssProperties({
				marginY: x => ({ marginTop: x, marginBottom: x }),
			})
			.newCssProps({
				myProp: { marginY: 999 },
			})

		renderApp(<Button myProp />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			marginTop: '999px',
			marginBottom: '999px',
		})
	})
})
