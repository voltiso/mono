// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { screen } from '@testing-library/react'
import type { IsEqual } from '@voltiso/util'
import { Assert } from '@voltiso/util'
import type {
	ComponentProps,
	ComponentPropsWithRef,
	ForwardRefRenderFunction,
} from 'react'
import { forwardRef } from 'react'

import { style } from '../../src'
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
		Assert<IsEqual<typeof big, boolean>>()
		return {}
	})
// @ts-expect-error missing big
;<OtherRedButton2 />

const AnotherButton = OtherRedButton2.mapProp('big', (x?: boolean) => !x)

describe('forwardRef', () => {
	it('works with forwardRef', () => {
		expect.hasAssertions()

		const Component = style(
			forwardRef<HTMLButtonElement, ComponentProps<typeof AnotherButton>>(
				(props, ref) => (
					<AnotherButton
						ref={ref}
						{...props}
					/>
				),
			),
		)

		renderApp(<Component big={false} />)
		const button = screen.getByRole('button')

		expect(button).toHaveStyle({
			height: '100px',
			color: 'red',
		})
	})

	it('works with forwardRef #2 - but requires className (static assert)', () => {
		expect.assertions(0)

		// @ts-expect-error no properties in common
		const Component = style(forwardRef(() => null))
		// Assert.is<typeof Component, `Error${string}`>()
	})

	it('curried', () => {
		expect.hasAssertions()

		const myStyle = style
			.css({
				color: 'blue',
			})
			.newCssProp('small', {
				height: 33,
				borderRadius: 22,
			})

		const render: ForwardRefRenderFunction<HTMLAnchorElement, {}> = (
			props,
			ref,
		) => (
			<a
				ref={ref}
				{...props}
			/>
		)

		const Button = forwardRef<HTMLAnchorElement, ComponentPropsWithRef<'a'>>(
			render,
		)

		const StyledButton = myStyle(Button)

		renderApp(
			<StyledButton
				small
				data-testid='test'
			/>,
		)
		const button = screen.getByTestId('test')

		expect(button).toHaveStyle({
			color: 'blue',
			height: '33px',
			borderRadius: '22px',
		})
	})
})