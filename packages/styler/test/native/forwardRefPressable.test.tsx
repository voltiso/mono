// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsEqual, IsIdentical } from '@voltiso/util'
import { $Assert, $Is } from '@voltiso/util'
import * as React from 'react'
import { Pressable, View } from 'react-native'

import type { ComponentPropsWithRef_, GetNativeElement } from '~'
import { style } from '~'

import { renderApp } from './common'

// eslint-disable-next-line react/forbid-component-props, import/newline-after-import
;<Pressable style={{}} />

const Button = style(Pressable)
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
		width: p.nativeID?.length || 0,
	}))
	.mapProps(({ big }) => {
		$Assert<IsEqual<typeof big, boolean>>()
		return {}
	})

// @ts-expect-error missing big
;<OtherRedButton2 />

const AnotherButton = OtherRedButton2.mapProp('big', (x?: boolean) => !x)

describe('forwardRefPressable', () => {
	it('works with forwardRef', () => {
		expect.hasAssertions()

		const Component = style(
			React.forwardRef<View, React.ComponentProps<typeof AnotherButton>>(
				(props, ref) => <AnotherButton ref={ref} {...props} />,
			),
		)

		const view = renderApp(<Component testID='a' big={false} />)
		// eslint-disable-next-line testing-library/prefer-screen-queries
		const button = view.getByTestId('a')

		expect(button.props.style).toMatchObject({
			height: 100,
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
			React.forwardRef<any>((props, ref) => (
				<AnotherButton ref={ref} {...props} />
			)) as React.ForwardRefExoticComponent<any>,
		)

		const view = renderApp(<Component testID='a' big={false} />)
		// eslint-disable-next-line testing-library/prefer-screen-queries
		const button = view.getByTestId('a')

		expect(button.props.style).toMatchObject({
			height: 100,
			color: 'red',
		})
	})

	it('works with forwardRef #2 - but requires className (static assert)', () => {
		expect.assertions(0)

		// @ts-expect-error no properties in common
		const Component = style(React.forwardRef(() => null))
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

		const Button = React.forwardRef<
			View,
			ComponentPropsWithRef_<typeof Pressable>
		>((props, ref) => <Pressable ref={ref} {...props} />)

		const StyledButton = myStyle(Button)

		const view = renderApp(<StyledButton small testID='test' />)
		// eslint-disable-next-line testing-library/prefer-screen-queries
		const button = view.getByTestId('test')

		expect(button.props.style).toMatchObject({
			color: 'blue',
			height: 33,
			borderRadius: 22,
		})
	})

	it('forwardRef', () => {
		expect.hasAssertions()

		const RenderButton: React.ForwardRefRenderFunction<
			View,
			React.ComponentProps<typeof View>
		> = (props, ref) => <View ref={ref} {...props} />

		$Assert.is<typeof RenderButton, React.ForwardRefRenderFunction<any>>()

		$Assert.is<GetNativeElement<typeof View>, View>()

		const Button = style.forwardRef<typeof View>((props, ref) => {
			$Assert.is<typeof ref, React.ForwardedRef<View>>()
			return <View ref={ref} {...props} />
		})

		$Assert.is<typeof Button, (...args: any) => any>()

		type B = React.ComponentPropsWithRef<typeof View>['ref']
		$Assert.is<B, React.LegacyRef<View> | undefined>()

		// type C = typeof Button extends (arg: infer R) => any ? R : never
		// type CCC = C['ref']
		// type CC = _<C>['ref']

		// type X = React.ComponentProps<typeof Button>['ref']

		// const a = React.forwardRef<View, { readonly a: 1 }>((_props, _ref) => {
		// 	return null
		// })

		// type Y = React.ComponentPropsWithRef<typeof a>['ref']

		// type B = React.ComponentPropsWithoutRef<typeof Button>['ref']
		// type X = React.ComponentPropsWithRef<
		// 	React.ForwardRefExoticComponent<{ a: 1 }>
		// >

		// type BBB = React.ComponentPropsWithRef<typeof View>['ref']
		type BB = React.ComponentPropsWithRef<typeof Button>
		type A = BB['ref']

		// type AAA = React.ComponentProps<typeof Button>['ref']
		// type AA = React.PropsWithRef<React.ComponentProps<typeof Button>>['ref']
		// type AX = _<AA>

		$Assert.is<A, React.Ref<View> | undefined>()
		// $Assert<IsIdentical<A, React.LegacyRef<View> | undefined>>()

		let instance: View | null = null

		renderApp(
			<Button
				ref={inst => {
					instance = inst
				}}
			/>,
		)

		expect(instance).toBeInstanceOf(View)
	})

	it('forwardRef and css', () => {
		expect.hasAssertions()

		const RawButton = style(Pressable)

		type A = GetNativeElement<typeof Pressable>
		$Assert<IsIdentical<A, View>>()

		const myStyle = style.defineProps<{ content: string }>()

		// type AA = View extends NativeElement ? 1 : 0

		// type Z = React.ComponentProps<View>
		// type XX = View['props']
		// $Assert.is<View, React.ComponentType<any>>()
		// $Assert.is<View, React.Component>()

		// type AA = View['props']

		// allow using `View` instead of `typeof View`
		const B = myStyle.forwardRef<View>((props, _ref) => {
			// $Assert<IsIdentical<typeof props.children, React.ReactNode>>()
			void props.content
			void props.children // type check
			return null
		})

		const Button = myStyle.forwardRef<
			typeof View,
			{ onClick?: (() => void) | undefined }
		>((props, ref, css) => {
			$Assert<IsIdentical<typeof props.children, React.ReactNode | undefined>>()

			expect(Array.isArray(css)).toBeTruthy()

			return (
				<RawButton
					{...props}
					ref={ref}
					css={[{ marginTop: 123, padding: 22 }, ...css]}
					onPress={() => {}}
				>
					{props.content}
				</RawButton>
			)
		})

		type B = GetNativeElement<typeof Button>
		$Assert<IsIdentical<B, View>>()

		let instance: View | null = null

		const view = renderApp(
			<Button
				testID='a'
				ref={inst => {
					instance = inst
				}}
				content='myContent'
				css={{ margin: 11, paddingTop: 222 }}
			/>,
		)

		expect(instance).toBeInstanceOf(View)

		// eslint-disable-next-line testing-library/prefer-screen-queries
		const button = view.getByTestId('a')

		// eslint-disable-next-line testing-library/no-node-access
		expect(button.props.children[0]).toBe('myContent')

		expect(button.props.style).toMatchObject({
			margin: 11,
			padding: 22,
			paddingTop: 222,
		})

		const AnotherButton = Button.css({ margin: 42 })

		// eslint-disable-next-line testing-library/render-result-naming-convention
		const view2 = renderApp(
			<AnotherButton testID='button' content='test' css={{ margin: 4242 }} />,
		)

		// eslint-disable-next-line testing-library/prefer-screen-queries
		const anotherButton = view2.getByTestId('button')

		expect(anotherButton.props.style).toMatchObject({
			margin: 4242,
		})
	})

	it('forward ref and css - component', () => {
		expect.hasAssertions()

		const Button = style(Pressable).newCssProps({
			magic: {
				margin: 123,
			},
		})

		const Another = style.forwardRef<typeof Button>((props, ref, css) => {
			$Assert($Is<'ref'>().not.subtypeOf<keyof typeof props>())

			return <Button ref={ref} css={css} {...props} />
		})

		const view = renderApp(<Another testID='a' magic />)

		// eslint-disable-next-line testing-library/prefer-screen-queries
		const button = view.getByTestId('a')

		expect(button.props.style).toMatchObject({ margin: 123 })
	})
})
