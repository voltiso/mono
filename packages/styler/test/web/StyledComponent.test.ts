// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import type { IsAny, IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'
import type { ComponentProps } from 'react'

import type {
	ComponentPropsWithoutRef_,
	ComponentPropsWithRef_,
	Css,
	GetStyled,
	GetStyledComponent,
	IStylable,
	IStyled,
	IStyledComponent,
	OuterProps,
	Props,
	StyledComponentLike,
	StyledSubject,
} from '~'

describe('StyledComponent', () => {
	it('type', () => {
		expect.assertions(0)

		type OptionalProps = {
			a?: 1
			b?: 2
			className?: string | undefined
			style?: Css | undefined
		}

		type A = GetStyledComponent<{ Props: OptionalProps }>

		$Assert.is<A, IStyledComponent>()
		$Assert.is<A, IStyled>()

		$Assert.is<A, StyledComponentLike<StyledSubject, Props>>()
		$Assert.is<A, StyledComponentLike<StyledSubject, {}>>()
	})

	it('type - second argument', () => {
		expect.assertions(0)

		// type A = ComponentProps<StyledComponentLike<StylableLike, { a: 1 }>> //!

		$Assert.is<
			GetStyled<{ Component: 'button'; Props: {} }>,
			IStyledComponent
		>()

		$Assert.is<
			GetStyledComponent<{ Component: 'button'; Props: {} }>,
			StyledComponentLike<StyledSubject, {}>
		>()

		$Assert.is<
			GetStyledComponent<{ Component: 'button'; Props: { a: 1 } }>,
			IStyledComponent
		>()

		$Assert.is<
			GetStyledComponent<{ Component: 'button'; Props: { abc: 1 } }>,
			StyledComponentLike<StyledSubject, { abc: 1 }>
		>()
	})

	it('type - hard', () => {
		expect.assertions(0)

		type RequiredProps = {
			a: 1
			b?: 2 | undefined
			className?: string | undefined
			style?: Css | undefined
		}

		$Assert.is<
			GetStyledComponent<{ Component: StyledSubject; Props: RequiredProps }>,
			IStyledComponent
		>()

		$Assert.is<
			GetStyledComponent<{ Component: StyledSubject; Props: RequiredProps }>,
			IStyledComponent
		>()

		$Assert.is<GetStyledComponent<{ Props: RequiredProps }>, IStyledComponent>()

		$Assert.is<GetStyledComponent<{ Props: RequiredProps }>, IStyled>()

		// Assert.is<
		// 	GetStyledComponent<{ props: RequiredProps }>,
		// 	StyledComponentLike<IStylable, Props>
		// >()

		// Assert.is<
		// 	GetStyledComponent<{ props: RequiredProps }>,
		// 	StyledComponentLike<IStylable, {}>
		// >()
	})

	it('generic', <P extends Props>() => {
		expect.assertions(0)

		$Assert.is<GetStyledComponent<{ Props: P }>, IStyledComponent>()
		$Assert.is<GetStyledComponent<{ Props: P }>, IStyled>()
		$Assert.is<GetStyledComponent<{ Props: P }>, IStylable>()
	})

	it('works (static type asserts) - not working with bivariance', () => {
		expect.assertions(0)

		// Assert.is<
		// 	IsSubtype<
		// 		GetStyledComponent<{ props: {} }>,
		// 		StyledComponentLike<{ props: { a: 1 } }>
		// 	>,
		// 	false
		// >()

		// Assert.is<
		// 	IsSubtype<
		// 		GetStyledComponent<{ props: { a: 1 } }>,
		// 		StyledComponentLike<{}>
		// 	>,
		// 	false
		// >()
	})

	it('is usable', <Comp extends IStyledComponent>() => {
		expect.assertions(0)

		type A = ComponentPropsWithRef_<IStyledComponent>
		$Assert<IsAny<A>>()

		type B = ComponentPropsWithoutRef_<IStyledComponent>
		$Assert<
			IsIdentical<
				B,
				{
					[x: string]: any
					[x: number]: any
					[x: symbol]: any
				}
			>
		>() // not ideal

		type C = ComponentPropsWithRef_<Comp>

		$Assert.is<C, { cssS: Css }>() // hmm (?)
	})

	it('always has OuterProps - easy', () => {
		expect.assertions(0)

		type SampleCss = { margin: 8 }

		type SC = GetStyledComponent<{ Props: Props }>

		type Easy = ComponentProps<SC>
		$Assert.is<Easy, OuterProps>()
		$Assert.is<SampleCss, Easy['css']>()

		type EasyReference = ComponentPropsWithRef_<
			GetStyledComponent<{ Props: Props }>
		>
		$Assert.is<EasyReference, OuterProps>()
		$Assert.is<SampleCss, EasyReference['css']>()

		type EasyNoReference = ComponentPropsWithoutRef_<
			GetStyledComponent<{ Props: Props }>
		>
		$Assert.is<EasyNoReference, OuterProps>()
		$Assert.is<SampleCss, EasyNoReference['css']>()
	})
})
