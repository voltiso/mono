// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { screen } from '@testing-library/react'
import type { Property } from 'csstype'
import type { ReactNode } from 'react'

import { style } from '~'

import { renderApp } from './common'

describe('wrap', () => {
	it('simple', () => {
		expect.hasAssertions()

		const Component = style('main').wrap(props => <div>{props.children}</div>)

		renderApp(<Component data-testid='test'>Hello</Component>)

		const myComponent = screen.getByTestId('test')

		expect(myComponent).toContainHTML(
			'<main data-testid="test"><div>Hello</div></main>',
		)
	})

	it('chain', () => {
		expect.hasAssertions()

		const Component = style('main')
			.wrap(props => <div>{props.children}</div>)
			.wrap(props => <button>{props.children}</button>)

		renderApp(<Component data-testid='test'>Hello</Component>)

		const myComponent = screen.getByTestId('test')

		expect(myComponent).toContainHTML(
			'<main data-testid="test"><div><button>Hello</button></div></main>',
		)
	})

	it('complex', () => {
		expect.hasAssertions()

		const H1 = style('h1')
		const MyFooter = style('footer').newCssProps({
			footerColor: (color: Property.Color) => ({ color }),
		})

		// @ts-expect-error no such element: `divA`
		;() => H1.wrap('divA')

		// good
		;() => H1.wrap('div')

		const MyFooter1 = MyFooter.newDomProp('data-testid', 'MyFooter1')

		const MyDiv = style('div')
			.newDomProp('data-testid', 'unset')
			.newProps({
				contentX: null as ReactNode,
				footerColor: 'red' as Property.Color,
			})
			.wrap(
				props => (
					<>
						<H1>Hello!</H1>

						<p>{props.contentX}</p>

						{props.children}
					</>
				),
				'span', // should not pass props
			)
			// wrap additional elements inside
			.wrap(
				MyFooter1, // should not pass props
				props => (
					<MyFooter footerColor={props.footerColor} data-testid='MyFooter2' />
				),
			)

		renderApp(
			<MyDiv
				data-testid='test'
				// eslint-disable-next-line react/forbid-component-props
				className='xxxxx'
				// eslint-disable-next-line react/forbid-component-props
				style={{ flex: 1 }}
				css={{ margin: 1 }}
				contentX='contentValue'
			>
				<div id='child' />
			</MyDiv>,
		)

		const myDiv = screen.getByTestId('test')

		expect(myDiv).toHaveClass('BDsg4w xxxxx', { exact: true })
		// expect(myDiv).toHaveClass('_0 xxxxx', { exact: true })
		expect(myDiv).toHaveStyle('flex: 1;')
		expect(myDiv).not.toHaveAttribute('css')
		expect(myDiv).not.toHaveAttribute('content')
		expect(myDiv).not.toHaveAttribute('footerColor')

		const myFooter2 = screen.getByTestId('MyFooter2')

		expect(myFooter2).toHaveStyle({ color: 'red' })

		const myFooter1 = screen.getByTestId('MyFooter1')

		expect(myFooter1).toHaveStyle({ color: 'unset' })

		// expect(myDiv).toContainHTML('aaaaa')
		expect(myDiv).toMatchSnapshot()
	})
})
