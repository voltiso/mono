// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { render, screen } from '@testing-library/react'
import type { Property } from 'csstype'
import type { ReactNode } from 'react'

import { createTheme, style, StyleProvider } from '~'

import { getRenderer } from './common'

type Theme = {
	primaryColor: Property.Color

	a: {
		boxShadow: string
		b: {
			c: {
				[0]: number
				[11]: number
			}
		}
	}
}
const t = createTheme<Theme>()

const renderApp = (children: ReactNode) =>
	render(
		<StyleProvider
			renderer={getRenderer()}
			theme={
				{
					primaryColor: 'mystic',

					a: {
						boxShadow: `dashed ${t.a.b.c[11]}px`,

						b: {
							c: {
								0: 666,
								11: 222,
							},
						},
					},
				} as Theme
			}
		>
			{children}
		</StyleProvider>,
	)

describe('theme', () => {
	it('simple', () => {
		expect.hasAssertions()

		const Button = style('button').css({
			borderWidth: t.a.b.c[11],
		})
		renderApp(<Button />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			borderWidth: 222,
		})
	})

	it('string literal', () => {
		expect.hasAssertions()
		expect(`${t.a.b.c[11]}px solid red`).toBe(
			'$__STYLER__{a.b.c.11}px solid red',
		)

		const Button = style('button').css({
			boxShadow: `${t.a.b.c[11]}px solid red`,
		})
		renderApp(<Button />)

		// const button = screen.getByRole('button')

		// expect(button).toHaveStyle({
		// 	boxShadow: '222px solid red',
		// })
	})

	it('string literal defaults to [0]', () => {
		expect.hasAssertions()

		const Button = style('button').css({
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			boxShadow: `${t.a.b.c}px solid red`,
		})
		renderApp(<Button />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			boxShadow: '666px solid red',
		})
	})

	it('string literal inside theme itself 1', () => {
		expect.hasAssertions()

		const Button = style('button').css({
			boxShadow: t.a.boxShadow,
		})
		renderApp(<Button />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			boxShadow: `dashed 222px`,
		})
	})

	it('string literal inside theme itself 2', () => {
		expect.hasAssertions()

		const Button = style('button').css({
			boxShadow: `${t.a.boxShadow} green`,
		})
		renderApp(<Button />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			boxShadow: `dashed 222px green`,
		})
	})

	it('theme as prop', () => {
		expect.hasAssertions()

		const Button = style('button')
			.newProps({
				backgroundColor: 'pink' as Property.Color,
			})
			.css(props => ({
				backgroundColor:
					props.backgroundColor === 'mystic' ? 'purple' : 'green',
			}))

		renderApp(<Button backgroundColor={t.primaryColor} />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			backgroundColor: 'purple',
		})
	})
})
