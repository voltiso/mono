// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { screen } from '@testing-library/react'

import { style } from '../../src'
import { renderApp } from './common'

describe('prop', () => {
	it('makes mandatory props optional', () => {
		expect.hasAssertions()

		const Button = style('button')
			.newRequiredProp('p', 'blue')
			.css(p => ({ color: p.p }))

		// @ts-expect-error p is required
		;() => <Button />

		const Button2 = Button.prop('p', 'red')

		// now p is optional
		renderApp(<Button2 />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			color: 'red',
		})

		// override red color
		renderApp(<Button2 p='blue'>a</Button2>)

		expect(screen.getByText('a')).toHaveStyle({ color: 'blue' })
	})

	it('boolean prop', () => {
		expect.hasAssertions()

		const C = style('input').prop('type', 'checkbox').prop('checked')
		renderApp(
			<C
				title='a'
				readOnly
			/>,
		)

		expect(screen.getByTitle('a')).toBeChecked()
	})

	it('sets cssProp', () => {
		expect.hasAssertions()

		const C = style('button').newCssProp('big', { height: 100 }).prop('big')

		renderApp(<C />)

		expect(screen.getByRole('button')).toHaveStyle({
			height: '100px',
		})
	})
})
