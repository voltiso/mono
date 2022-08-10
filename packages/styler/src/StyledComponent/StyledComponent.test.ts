// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsAny, IsIdentical, IsSubtype } from '@voltiso/util'
import { Assert } from '@voltiso/util'
import type {
	ComponentProps,
	ComponentPropsWithoutRef,
	ComponentPropsWithRef,
} from 'react'

import type { IStylable, IStyled, OuterProps, Props, Styled } from '~'
import type { Css } from '~/Css'

import type { IStyledComponent, StyledComponent } from '.'

describe('StyledComponent', () => {
	it('type', () => {
		expect.assertions(0)

		type OptionalProperties = {
			a?: 1
			b?: 2
			className?: string | undefined
			style?: Css | undefined
		}

		Assert.is<StyledComponent<OptionalProperties>, IStyledComponent>()
		Assert.is<StyledComponent<OptionalProperties>, StyledComponent>()
		Assert.is<StyledComponent<OptionalProperties>, IStyled>()
		Assert.is<StyledComponent<OptionalProperties>, Styled>()

		Assert.is<StyledComponent<OptionalProperties>, StyledComponent<Props>>()
		Assert.is<StyledComponent<OptionalProperties>, StyledComponent<{}>>()
	})

	it('type - second argument', () => {
		expect.assertions(0)

		// type A = ComponentProps<StyledComponent_<{ a: 1 }, Stylable>>

		Assert.is<StyledComponent<{}, 'button'>, StyledComponent>()
		Assert.is<StyledComponent<{}, 'button'>, StyledComponent<{}>>()

		Assert.is<StyledComponent<{ a: 1 }, 'button'>, StyledComponent>()
		Assert.is<StyledComponent<{ a: 1 }, 'button'>, StyledComponent<{ a: 1 }>>()
	})

	it('type - hard', () => {
		expect.assertions(0)

		type RequiredProperties = {
			a: 1
			b?: 2 | undefined
			className?: string | undefined
			style?: Css | undefined
		}

		Assert.is<StyledComponent<RequiredProperties>, IStyledComponent>()
		Assert.is<StyledComponent<RequiredProperties>, IStyled>()

		// Assert.is<StyledComponent<RequiredProps>, StyledComponent<Props>>()
		// Assert.is<StyledComponent<RequiredProps>, StyledComponent<{}>>()
	})

	it('generic', <P extends Props>() => {
		expect.assertions(0)

		Assert.is<StyledComponent<P>, IStyledComponent>()
		Assert.is<StyledComponent<P>, IStyled>()
		Assert.is<StyledComponent<P>, IStylable>()
	})

	it('works (static type asserts)', () => {
		expect.assertions(0)

		Assert.is<
			IsSubtype<StyledComponent<{}>, StyledComponent<{ a: 1 }>>,
			false
		>()

		Assert.is<
			IsSubtype<StyledComponent<{ a: 1 }>, StyledComponent<{}>>,
			false
		>()
	})

	it('is usable', <Comp extends IStyledComponent>() => {
		expect.assertions(0)

		type A = ComponentPropsWithRef<IStyledComponent>
		Assert<IsAny<A>>()

		type B = ComponentPropsWithoutRef<IStyledComponent>
		Assert<
			IsIdentical<
				B,
				{
					[x: string]: any
					[x: number]: any
					[x: symbol]: any
				}
			>
		>() // not ideal

		type C = ComponentPropsWithRef<Comp>

		Assert.is<C, { cssS: Css }>() // hmm (?)
	})

	it('always has OuterProps - easy', () => {
		expect.assertions(0)

		type SampleCss = { margin: 8 }

		type Easy = ComponentProps<StyledComponent<Props>>
		Assert.is<Easy, OuterProps>()
		Assert.is<SampleCss, Easy['css']>()

		type EasyReference = ComponentPropsWithRef<StyledComponent<Props>>
		Assert.is<EasyReference, OuterProps>()
		Assert.is<SampleCss, EasyReference['css']>()

		type EasyNoReference = ComponentPropsWithoutRef<StyledComponent<Props>>
		Assert.is<EasyNoReference, OuterProps>()
		Assert.is<SampleCss, EasyNoReference['css']>()
	})
})
