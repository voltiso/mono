// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { afterEach, describe, expect, it } from '@jest/globals'
// eslint-disable-next-line testing-library/no-manual-cleanup
import { cleanup, screen } from '@testing-library/react'

import { style } from '~'

import { renderApp } from './common'

describe('curried', () => {
	// eslint-disable-next-line jest/no-hooks
	afterEach(() => {
		cleanup() // required after upgrading testing library
	})

	it('simple', () => {
		expect.hasAssertions()

		const Button = style.css({ color: 'red' })('button')
		renderApp(<Button />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			color: 'rgb(255, 0, 0)',
		})
	})

	it('new props (mandatory)', () => {
		expect.hasAssertions()

		const myStyle = style.newProps({ red: false }).css(p => ({
			color: p.red ? 'red' : undefined,
		}))
		const Button = myStyle('button')

		;() => <Button />

		renderApp(<Button red />)
		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			color: 'rgb(255, 0, 0)',
		})
	})

	it('new props (optional & present)', () => {
		expect.hasAssertions()

		const Button = style
			.newProps({ red: false as boolean | undefined })
			.css(p => ({
				color: p.red ? 'red' : undefined,
			}))('button')

		renderApp(<Button red />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			color: 'rgb(255, 0, 0)',
		})
	})

	it('new props (optional & not present)', () => {
		expect.hasAssertions()

		const Button = style
			.css({ color: 'purple' })
			.newProps({ red: false as boolean | undefined })
			.css(p => ({
				color: p.red ? 'red' : undefined,
			}))('button')
		renderApp(<Button />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			color: 'rgb(128, 0, 128)',
		})
	})

	it('css -> component -> css', () => {
		expect.hasAssertions()

		const Button = style.css({ color: 'red' })('button').css({ color: 'blue' })
		renderApp(<Button />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			color: 'rgb(0, 0, 255)',
		})
	})

	it('css -> component -> css -> inline', () => {
		expect.hasAssertions()

		const Button = style.css({ color: 'red' })('button').css({ color: 'blue' })
		renderApp(<Button css={{ color: 'green' }} />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			color: 'rgb(0, 128, 0)',
		})
	})

	it('css props -> component -> inline custom prop', () => {
		expect.hasAssertions()

		const Button = style.cssProps('color')('button')
		renderApp(<Button color='green' />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			color: 'rgb(0, 128, 0)',
		})
	})

	it('css -> already styled', () => {
		expect.hasAssertions()

		const myStyle = style.css({ color: 'red' })

		const alreadyStyled = style('button')

		const Button = myStyle(alreadyStyled)
		renderApp(<Button />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			color: 'rgb(255, 0, 0)',
		})
	})

	it('css props -> already styled -> css', () => {
		expect.hasAssertions()

		const myStyle = style.cssProps('color')

		const alreadyStyled = style('button')

		const Button = myStyle(alreadyStyled).css({ color: 'blue' })
		renderApp(<Button color='red' />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			color: 'rgb(255, 0, 0)',
		})
	})

	it('custom css props -> already styled -> inline prop', () => {
		expect.hasAssertions()

		const myStyle = style.newCssProps({ red: { color: 'red' } })

		const AlreadyStyled = myStyle('button')

		const Button = myStyle(AlreadyStyled)
		renderApp(<Button red />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			color: 'rgb(255, 0, 0)',
		})
	})
})
