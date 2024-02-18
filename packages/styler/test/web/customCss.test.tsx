// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { screen } from '@testing-library/react'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'
import type { Property } from 'csstype'

import type { Css, CustomStyledHoc, StyledLike } from '~'
import { style } from '~'

import { renderApp } from './common'

describe('customCss', () => {
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

	it('both cssProps and customCss', () => {
		expect.hasAssertions()

		const customProperties = {
			big: () => ({ height: 666 }),
		}

		const myStyle = style
			.newCssProps(customProperties)
			.newCustomCssProperties(customProperties)

		$Assert<
			IsIdentical<
				typeof myStyle,
				CustomStyledHoc<{
					Props: {
						big?: boolean | undefined
					}
					CustomCss: {
						big?: boolean | undefined
					}
				}>
			>
		>()

		const Button = myStyle('button')

		$Assert.is<
			typeof Button,
			StyledLike<{
				Component: 'button'

				Props: {
					big?: boolean | undefined
				}
				CustomCss: {
					big?: boolean | undefined
				}
			}>
		>()

		renderApp(<Button big />)

		let button = screen.getByRole('button')

		expect(button).toHaveStyle({ height: '666px' })

		renderApp(<Button data-testid='test-2' css={{ big: true }} />)
		button = screen.getByTestId('test-2')

		expect(button).toHaveStyle({ height: '666px' })
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

	it('hoc', () => {
		expect.hasAssertions()

		function marginY(x: Property.Margin | number | boolean): Css {
			if (typeof x === 'boolean' && !x) return {}
			const margin = typeof x === 'boolean' ? 123 : x
			return {
				marginTop: margin,
				marginBottom: margin,
			}
		}

		const myStyle = style.newCustomCssProperties({ marginY })

		const Button = myStyle('button')

		renderApp(<Button css={{ marginY: '12px' }} />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			marginTop: '12px',
			marginBottom: '12px',
		})
	})
})
