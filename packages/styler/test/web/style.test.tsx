// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { screen } from '@testing-library/react'
import type { IsEqual, IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'
import type { FC } from 'react'

import { style } from '~'

import { renderApp } from './common'

const Button = style('button')
const RedButton = Button.css({
	margin: 4,
	color: 'red',
	borderWidth: 8,
})

const OtherRedButton = RedButton.css({
	borderWidth: 16,
})

const OtherRedButton2 = OtherRedButton.newRequiredProps({ big: false })
	.css(p => ({
		height: p.big ? 100 : 50,
		width: p.name?.length || 0,
	}))
	.mapProps(({ big }) => {
		$Assert<IsEqual<typeof big, boolean>>()
		return {}
	})

// @ts-expect-error missing big
;() => <OtherRedButton2 />

const OtherRedButton3 = OtherRedButton2.mapProps(props => ({
	big: props.id === 'BIG',
}))

const AnotherButton = OtherRedButton2.mapProp('big', (x?: boolean) => {
	$Assert<IsIdentical<typeof x, boolean | undefined>>()
	return !x
})

const OnClickMapped = AnotherButton.mapProp(
	'onClick',
	(f?: () => void) =>
		f &&
		(event => {
			event.preventDefault()
			f()
		}),
)
;<OnClickMapped big />

describe('style', () => {
	it('simple', () => {
		expect.hasAssertions()

		renderApp(<RedButton />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			color: 'red',
		})
	})

	it('overwrite newCssProp => css', () => {
		expect.hasAssertions()

		const name = 'Adam'

		const Button = style('button').newCssProp('red', { color: 'red' })
		renderApp(
			<Button red css={{ color: 'green' }}>
				Hello {name}
			</Button>,
		)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			color: 'green',
		})
	})

	it('overwrite css => css', () => {
		expect.hasAssertions()

		renderApp(
			<RedButton
				css={{
					color: 'green',

					_: { '[data-state=asd]': { color: 'purple' } },
				}}
			/>,
		)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			margin: '4px',
			color: 'green',
		})
	})

	it('overwrite css => css #2', () => {
		expect.hasAssertions()

		renderApp(
			<OtherRedButton
				css={{
					_: {
						_: {
							margin: 88,
						},
					},
				}}
			/>,
		)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			margin: '88px',
			color: 'red',
			borderWidth: 16,
		})
	})

	it('overwrite css => css (undefined does not overwrite)', () => {
		expect.hasAssertions()

		renderApp(<OtherRedButton css={{ margin: undefined }} />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			margin: '4px',
			color: 'red',
			borderWidth: 16,
		})
	})

	it('cssFromProps', () => {
		expect.hasAssertions()

		renderApp(<OtherRedButton2 big />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			height: '100px',
			color: 'red',
		})
	})

	it('mapProps 1', () => {
		expect.hasAssertions()

		renderApp(<OtherRedButton3 id='SMALL' />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			height: '50px',
			color: 'red',
		})
	})

	it('mapProps 2', () => {
		expect.hasAssertions()

		renderApp(<OtherRedButton3 id='BIG' />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			height: '100px',
			color: 'red',
		})
	})

	it('map single prop 1', () => {
		expect.hasAssertions()

		renderApp(<AnotherButton />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			height: '100px',
			color: 'red',
		})
	})

	it('map single prop 2', () => {
		expect.hasAssertions()

		renderApp(<AnotherButton big={false} />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			height: '100px',
			color: 'red',
		})
	})

	it('newProp - defaultValue', () => {
		expect.hasAssertions()

		const Button = style('button')
			.newProp('m', 123)
			.css(p => ({ margin: p.m }))
		renderApp(<Button />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			margin: '123px',
		})
	})

	it('newProp', () => {
		expect.hasAssertions()

		const Button = style('button')
			.newProp('m', 123)
			.css(p => ({ margin: p.m }))
		renderApp(<Button m={234} />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			margin: '234px',
		})
	})

	it('newProp - boolean - defaultValue', () => {
		expect.hasAssertions()

		const Button = style('button')
			.newProp('big')

			.css(p => ({ height: p.big ? 100 : 10 }))
		renderApp(<Button />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			height: '10px',
		})
	})

	it('newProp - boolean', () => {
		expect.hasAssertions()

		const Button = style('button')
			.newProp('big')

			.css(p => ({ height: p.big ? 100 : 10 }))
		renderApp(<Button big />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			height: '100px',
		})
	})

	it('cssProp (present)', () => {
		expect.hasAssertions()

		const MyButton = style('button').newCssProp('large', { height: 1_000 })
		renderApp(<MyButton large />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			height: '1000px',
		})
	})

	it('cssProp (not present)', () => {
		expect.hasAssertions()

		const MyButton = style('button').newCssProp('large', { height: 1_000 })
		renderApp(<MyButton />)

		const button = screen.getByRole('button')

		expect(button).not.toHaveStyle({
			height: '1000px',
		})
	})

	it('cssProps (present)', () => {
		expect.hasAssertions()

		const MyButton = style('button').newCssProps({
			large: { height: 1_000 },
		})
		renderApp(<MyButton large />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			height: '1000px',
		})
	})

	it('cssProps (not present)', () => {
		expect.hasAssertions()

		const MyButton = style('button').newCssProps({
			large: { height: 1_000 },
		})
		renderApp(<MyButton />)

		const button = screen.getByRole('button')

		expect(button).not.toHaveStyle({
			height: '1000px',
		})
	})

	it('cssProps - function (present)', () => {
		expect.hasAssertions()

		const MyButton = style('button').newCssProps({
			h: (p: number) => ({
				height: p + 100,
			}),
		})
		renderApp(<MyButton h={1_000} />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			height: '1100px',
		})
	})

	it('cssProps - function (not present)', () => {
		expect.hasAssertions()

		const MyButton = style
			.css({ height: 11 })('button')
			.newCssProps({
				h: (p: number) => ({
					height: p + 100,
				}),
			})
		renderApp(<MyButton />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			height: '11px',
		})
	})

	// TODO - do we need such optimization?

	// eslint-disable-next-line jest/no-commented-out-tests
	// it(`doesn't apply double style`, () => {
	// 	expect.hasAssertions()

	// 	const Component = style(AnotherButton)
	// 	renderApp(<Component big={false} />)

	// 	const button = screen.getByRole('button')

	// 	expect(button).toHaveStyle({
	// 		height: '100px',
	// 		color: 'red',
	// 	})

	// 	expect(AnotherButton[STYLED_DATA].stack).toHaveLength(6)

	// 	expect(Component[STYLED_DATA].stack).toHaveLength(6)
	// })

	it('inner ref is called', () => {
		expect.hasAssertions()

		let calls = 0
		const RefButton = Button.props({
			ref: _inst => {
				++calls
			},
		})
		renderApp(<RefButton />)

		expect(calls).toBe(1)
	})

	it('outer ref is called', () => {
		expect.hasAssertions()

		let calls = 0
		let outerCalls = 0
		const RefButton = Button.props({
			ref: _inst => {
				++calls
			},
		})
		renderApp(
			<RefButton
				ref={() => {
					++outerCalls
				}}
			/>,
		)

		expect(calls).toBe(0)
		expect(outerCalls).toBe(1)
	})

	it('requires className prop (type-only assert)', () => {
		expect.assertions(0)

		const C: FC = () => null
		// @ts-expect-error no className prop
		const CC = style(C)
	})

	it('merges nested', () => {
		expect.hasAssertions()

		const A = style('button')
			.css({ _: { _: { color: 'red' } } })
			.css({ _: { backgroundColor: 'purple' } })
			.css({ color: 'green' })

		renderApp(<A />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			color: 'green',
			backgroundColor: 'purple',
		})
	})

	it('relaxedCss typing', () => {
		;() =>
			// @ts-expect-error `colorA`
			style('button').cssSelectors({
				'* li': {
					colorA: 'red',
				},
			})

		// good
		;() =>
			style('button').cssSelectors({
				'* li': {
					color: 'red',
				},
			})
	})
})
