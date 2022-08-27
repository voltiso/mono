// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { screen } from '@testing-library/react'
import type { IsIdentical, Throw } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import { style } from '~'

import { renderApp } from './common'

describe('cssProps', () => {
	it('works', () => {
		expect.hasAssertions()

		const Button = style('button').cssProps('flex', 'backgroundColor')
		;<Button /> // check if optional
		renderApp(
			<Button
				flex={1}
				backgroundColor='red'
			/>,
		)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			flex: 1,
			backgroundColor: 'red',
		})
	})

	it('does not allow overwriting props', () => {
		expect.hasAssertions()

		const Svg = style('svg')
			.newCssProp('gap', { margin: 10 })
			.newCssProps({
				border: {
					borderRadius: 8,
				},

				magic: {
					color: 'purple',
				},
			})

		const BadSvg = Svg.cssProps('gap', 'border', 'margin')

		Assert<
			IsIdentical<
				typeof BadSvg,
				Throw<
					'Props already exist' & {
						duplicateProps: 'border' | 'gap'
					}
				>
			>
		>()

		const StrippedSvg = Svg.forgetProps('border', 'gap')

		// @ts-expect-error no `border`
		;() => <StrippedSvg border />

		// @ts-expect-error no `gap`
		;() => <StrippedSvg gap />

		// good!
		;() => <StrippedSvg magic />

		const GoodSvg = StrippedSvg.cssProps('margin')

		renderApp(
			<GoodSvg
				data-testid='a'
				margin={8}
			/>,
		)
		const svg = screen.getByTestId('a')

		expect(svg).toHaveStyle({
			margin: '8px',
		})
	})
})
