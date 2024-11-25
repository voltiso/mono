// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import type { $Omit, IsIdentical, StaticError } from '@voltiso/util'
import { $Assert } from '@voltiso/util'
import type {
	ChangeEvent,
	ComponentProps,
	FC,
	ReactElement,
	RefObject,
} from 'react'

import type {
	$ComponentProps,
	ComponentPropsWithRef_,
	Css,
	GetStyledHoc,
	IStyled,
	IStyledComponent,
	IStyledHoc,
	IStyledHocCall,
	Props,
	Stylable,
	StylableIntrinsic,
	StylableJsxCall,
	StylableJsxConstruct,
	StyledComponent,
	StyledHocCall,
	WebOuterProps,
} from '~'

describe('StyledHoc', () => {
	it('generic', <P extends Props, CP extends Props>() => {
		expect.assertions(0)

		$Assert.is<GetStyledHoc<{ Props: P }>, IStyledHoc>()

		$Assert.is<StyledHocCall<{ Props: P; CustomCss: CP }>, IStyledHocCall>()

		// Assert.is<Styled<P>, Styled<Props>>()
	})

	it('type', () => {
		expect.assertions(0)

		type GoodProps = {
			a: 1
			b?: 2
			className?: string | undefined
			style?: Css | undefined
		}

		type StyledGoodProps = GetStyledHoc<{ Props: GoodProps }>
		$Assert.is<StyledGoodProps, IStyledHoc>()

		type BadProps = {
			a: 1
			b?: 2
		}

		type StyledBadProps = GetStyledHoc<{ Props: BadProps }>
		$Assert.is<StyledBadProps, IStyledHoc>()
	})

	it('style the stylable', () => {
		expect.assertions(0)

		const style = {} as unknown as GetStyledHoc<{}>

		type TextProps = {
			id?: string | undefined
			ref?:
				| undefined
				| null
				| RefObject<HTMLInputElement>
				| ((inst: HTMLInputElement) => void)
			value?: string | number | readonly string[] | undefined
			onChange?: undefined | ((e: ChangeEvent<HTMLInputElement>) => void)

			validationResult?: string | undefined
		}

		const aa = () => style(0 as unknown as StylableJsxCall<TextProps>)
		type AA = ReturnType<typeof aa>
		$Assert.is<AA, IStyledComponent>()

		const bb = () => style(0 as unknown as StylableJsxConstruct<TextProps>)
		type BB = ReturnType<typeof bb>
		$Assert.is<BB, IStyledComponent>()

		type XX = React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLElement>,
			HTMLElement
		>['className']
		$Assert<IsIdentical<XX, string | undefined>>()

		const cc = () => style(0 as unknown as StylableIntrinsic<TextProps>)
		type CC = ReturnType<typeof cc>
		$Assert.is<CC, IStyledComponent>()
		;() => style(0 as unknown as StylableIntrinsic<TextProps>)

		//

		const a = () => style(0 as unknown as Stylable<TextProps>)
		type A = ReturnType<typeof a>
		$Assert.is<A, IStyledComponent>()
	})

	it('style the stylable - generic', <S extends Stylable<{
		a?: number
		b?: string
	}>>() => {
		expect.assertions(0)

		const style = {} as unknown as GetStyledHoc<{}>

		const a = () => style(0 as unknown as S)
		type A = ReturnType<typeof a>

		$Assert.is<A, IStyled>()

		type B = ComponentProps<A>
		$Assert.is<'a', keyof B>()
		$Assert.is<'b', keyof B>()

		type C = ComponentProps<S>
		$Assert.is<'a', keyof C>()
		$Assert.is<'b', keyof C>()

		type D = ComponentPropsWithRef_<A>
		$Assert.is<'a', keyof D>()
		$Assert.is<'b', keyof D>()

		type E = ComponentProps<StyledComponent<S>>
		$Assert.is<'a', keyof E>()
		$Assert.is<'b', keyof E>()

		type F = $Omit<ComponentPropsWithRef_<S>, keyof WebOuterProps<{}>>
		$Assert.is<'a', keyof F>()
		$Assert.is<'b', keyof F>()
	})

	it('style the stylable - `size` prop', <S extends Stylable<{
		size?: number
		b?: string
	}>>() => {
		expect.assertions(0)

		const style = {} as unknown as GetStyledHoc<{}>

		const a = () => style(0 as unknown as S)
		type A = ReturnType<typeof a>

		$Assert.is<A, IStyled>()

		type C = $ComponentProps<S>

		$Assert.is<'size', keyof C>()
		$Assert.is<'b', keyof C>()

		type D = ComponentProps<A>
		$Assert.is<'size', keyof D>()
		$Assert.is<'b', keyof D>()
	})

	it('call signature', () => {
		expect.assertions(0)

		const style = function () {} as unknown as GetStyledHoc<{}>

		// easy
		const a0 = style({} as unknown as FC<{ className?: string | undefined }>)
		$Assert.is<typeof a0, FC>()

		//

		// // @ts-expect-error missing className prop
		// ;() => style({} as unknown as FC)
		const a = style({} as unknown as FC)
		$Assert.is<typeof a, StaticError>()

		// // @ts-expect-error missing className prop
		// ;() => style({} as unknown as (props: {}) => ReactElement | null)
		const b = style({} as unknown as (props: {}) => ReactElement | null)
		$Assert.is<typeof b, StaticError>()

		// // @ts-expect-error missing className prop
		// ;() => style({} as unknown as FC<{ href: string }>)
		const c = style({} as unknown as FC<{ href: string }>)
		$Assert.is<typeof c, StaticError>()

		// ...better!
		const cc = style({} as unknown as FC<{ href: string; className?: string }>)
		$Assert<
			IsIdentical<
				typeof cc,
				StyledComponent<
					FC<{
						href: string
						className?: string
					}>
				>
			>
		>()

		//

		// // @ts-expect-error missing className prop
		// ;() => style({} as unknown as (props: { a: 1 }) => ReactElement)
		const dd = style({} as unknown as (props: { a: 1 }) => ReactElement)
		$Assert.is<typeof dd, StaticError>()

		// ...better!
		const ddd = style(
			{} as unknown as (props: {
				a: 1
				className?: string | undefined
			}) => ReactElement,
		)
		$Assert.is<typeof ddd, IStyled>()

		//

		//

		// also good
		type DInner = (props: {
			readonly className: string
			otherRequired: string
		}) => ReactElement

		const d = () => style({} as unknown as DInner)

		type D = ReturnType<typeof d>

		$Assert<IsIdentical<D, StyledComponent<DInner>>>()
	})
})
