// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { screen } from '@testing-library/react'
import type { IsEqual, IsIdentical } from '@voltiso/util'
import { Assert, Is } from '@voltiso/util'
import type { IStyle } from 'fela'
import type {
	ComponentProps,
	ComponentPropsWithRef,
	DOMAttributes,
	ForwardRefExoticComponent,
	ForwardRefRenderFunction,
	ReactNode,
	Ref,
} from 'react'
import { forwardRef } from 'react'

import type { ComponentPropsWithRef_, GetNativeElement } from '~'
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

	it('forwardRef - complex', () => {
		expect.assertions(0)

		const component = 0 as unknown as React.ForwardRefExoticComponent<
			{ myProp: boolean } & React.RefAttributes<HTMLButtonElement>
		>

		//
		;() => style(component)
	})

	it('works with forwardRef<any>', () => {
		expect.hasAssertions()

		const Component = style(
			forwardRef((props, ref) => (
				<AnotherButton
					ref={ref}
					{...props}
				/>
			)) as ForwardRefExoticComponent<any>,
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

		const Button = forwardRef<HTMLAnchorElement, ComponentPropsWithRef_<'a'>>(
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

	it('forwardRef', () => {
		expect.hasAssertions()

		const RenderButton: ForwardRefRenderFunction<
			HTMLButtonElement,
			ComponentProps<'button'>
		> = (props, ref) => (
			<button
				ref={ref}
				{...props}
			/>
		)

		Assert.is<typeof RenderButton, ForwardRefRenderFunction<any>>()

		const Button = style.forwardRef(RenderButton)
		Assert.is<
			ComponentPropsWithRef<typeof Button>['ref'],
			Ref<HTMLButtonElement> | undefined
		>()

		let instance: HTMLButtonElement | null = null

		renderApp(
			<Button
				ref={inst => {
					instance = inst
				}}
			/>,
		)

		expect(instance).toBeInstanceOf(HTMLButtonElement)
	})

	it('forwardRef and css', () => {
		expect.hasAssertions()

		const RawButton = style('button')

		type A = GetNativeElement<'button'>
		Assert<IsIdentical<A, HTMLButtonElement>>()

		const myStyle = style.defineProps<{ content: string }>()

		const Button = myStyle.forwardRef<
			'button',
			{ onClick?: (() => void) | undefined }
		>((props, ref, css) => {
			Assert<IsIdentical<typeof props.children, ReactNode | undefined>>()

			expect(Array.isArray(css)).toBeTruthy()

			return (
				<RawButton
					{...props}
					ref={ref}
					css={[{ marginTop: 123, padding: 22 }, ...css]}
					onClick={() => {}}
				>
					{props.content}
				</RawButton>
			)
		})

		type B = GetNativeElement<typeof Button>
		Assert<IsIdentical<B, HTMLButtonElement>>()

		let instance: HTMLButtonElement | null = null

		renderApp(
			<Button
				ref={inst => {
					instance = inst
				}}
				content='myContent'
				css={{ margin: 11, paddingTop: 222 }}
			/>,
		)

		expect(instance).toBeInstanceOf(HTMLButtonElement)

		const button = screen.getByRole('button')

		expect(button).toContainHTML('myContent')

		expect(button).toHaveStyle({
			margin: '11px',
			padding: '222px 22px 22px 22px',
		})
	})

	it('forward ref and css - component', () => {
		expect.hasAssertions()

		const Button = style('button').newCssProps({
			magic: {
				margin: 123,
			},
		})

		const Another = style.forwardRef<typeof Button>((props, ref, css) => {
			Assert(Is<'ref'>().not.subtypeOf<keyof typeof props>())

			return (
				<Button
					ref={ref}
					css={css}
					{...props}
				/>
			)
		})

		renderApp(<Another magic />)

		const button = screen.getByRole('button')

		expect(button).toHaveStyle({ margin: '123px' })
	})

	it('type-test from api-shop', () => {
		expect.assertions(0)

		const render: ForwardRefRenderFunction<
			HTMLAnchorElement,
			{
				href?: string
				children?: ReactNode
				css?: IStyle
				className?: string | undefined
			} & DOMAttributes<HTMLAnchorElement>
		> = (_props, _ref) => null

		render.displayName = 'VLink'

		const VLink = style(forwardRef(render))

		//
		;() => <VLink />
	})
})
