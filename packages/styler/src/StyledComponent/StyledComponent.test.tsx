// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsAny, IsIdentical, IsSubtype } from '@voltiso/util'
import { Assert } from '@voltiso/util'
import type {
	ComponentProps,
	ComponentPropsWithoutRef,
	ComponentPropsWithRef,
} from 'react'

import type { Css } from '../Css.js'
import type { Props as Properties } from '../react-types'
import type { IStylable, OuterProps as OuterProperties } from '../Stylable'
import type { IStyled, Styled } from '../Styled'
import type { StyledComponent } from './AutoStyledComponent.js'
import type { IStyledComponent } from './IStyledComponent.js'

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

		Assert.is<
			StyledComponent<OptionalProperties>,
			StyledComponent<Properties>
		>()
		Assert.is<StyledComponent<OptionalProperties>, StyledComponent<{}>>()

		// auto-IStyledComponent
		// Assert.is<StyledComponent<OptionalProps>, StyledComponent>()
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

	it('generic', <P extends Properties>() => {
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

		type Easy = ComponentProps<StyledComponent<Properties>>
		Assert.is<Easy, OuterProperties>()
		Assert.is<SampleCss, Easy['css']>()

		type EasyReference = ComponentPropsWithRef<StyledComponent<Properties>>
		Assert.is<EasyReference, OuterProperties>()
		Assert.is<SampleCss, EasyReference['css']>()

		type EasyNoReference = ComponentPropsWithoutRef<StyledComponent<Properties>>
		Assert.is<EasyNoReference, OuterProperties>()
		Assert.is<SampleCss, EasyNoReference['css']>()
	})

	// eslint-disable-next-line jest/no-commented-out-tests
	// it('always has OuterProps - hard', <P extends Props>() => {
	// 	expect.assertions(0)

	// 	type Hard = ComponentProps<StyledComponent<P>>
	// 	Assert.is<Hard, OuterProps>()
	// 	Assert.is<SampleCss, Hard['css']>()

	// 	type HardRef = ComponentPropsWithRef<StyledComponent<P>>
	// 	Assert.is<HardRef, OuterProps>()
	// 	Assert.is<SampleCss, HardRef['css']>()

	// 	type HardNoRef = ComponentPropsWithoutRef<StyledComponent<P>>
	// 	Assert.is<HardNoRef, OuterProps>()
	// 	// Assert.is<SampleCss, HardNoRef['css']>() // React Typings not perfect...
	// })
})
