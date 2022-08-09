// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical, StaticError } from '@voltiso/util'
import { Assert } from '@voltiso/util'
import type { ChangeEvent, FC, ReactElement, RefObject } from 'react'

import type { Css } from '~/Css'
import type { Props } from '~/react-types'
import type { Stylable } from '~/Stylable'
import type { StylableIntrinsic } from '~/Stylable/_/StylableIntrinsic'
import type { StylableJsxCall } from '~/Stylable/_/StylableJsxCall'
import type { StylableJsxConstruct } from '~/Stylable/_/StylableJsxConstruct'
import type { StyledComponent } from '~/StyledComponent'

import type { StyledHoc } from './AutoStyledHoc'
import type { IStyledHoc, IStyledHocCall } from './IStyledHoc'
import type { StyledHocCall } from './StyledHoc'

describe('StyledHoc', () => {
	it('generic', <P extends Props>() => {
		expect.assertions(0)

		Assert.is<StyledHoc<P>, IStyledHoc>()
		Assert.is<StyledHoc<P>, StyledHoc>()

		Assert.is<StyledHocCall<P>, IStyledHocCall>()

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

		type StyledGoodProps = StyledHoc<GoodProps>
		Assert.is<StyledGoodProps, IStyledHoc>()

		type BadProps = {
			a: 1
			b?: 2
		}

		type StyledBadProps = StyledHoc<BadProps>
		Assert.is<StyledBadProps, IStyledHoc>()
	})

	it('style the stylable', () => {
		expect.assertions(0)

		const style = {} as unknown as StyledHoc<{}>

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
		Assert.is<AA, StyledComponent>()

		const bb = () => style(0 as unknown as StylableJsxConstruct<TextProps>)
		type BB = ReturnType<typeof bb>
		Assert.is<BB, StyledComponent>()

		type XX = React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLElement>,
			HTMLElement
		>['className']
		Assert<IsIdentical<XX, string | undefined>>()

		const cc = () => style(0 as unknown as StylableIntrinsic<TextProps>)
		type CC = ReturnType<typeof cc>
		Assert.is<CC, StyledComponent>()
		;() => style(0 as unknown as StylableIntrinsic<TextProps>)

		//
		const a = () => style(0 as unknown as Stylable<TextProps>)
		type A = ReturnType<typeof a>
		Assert.is<A, StyledComponent>()
	})

	it('call signature', () => {
		expect.assertions(0)

		const style = {} as unknown as StyledHoc<{}>

		// easy
		;() => style({} as unknown as FC<{ className?: string | undefined }>)

		//

		// // @ts-expect-error missing className prop
		// ;() => style({} as unknown as FC)
		const a = style({} as unknown as FC)
		Assert.is<typeof a, StaticError>()

		// // @ts-expect-error missing className prop
		// ;() => style({} as unknown as (props: {}) => ReactElement | null)
		const b = style({} as unknown as (props: {}) => ReactElement | null)
		Assert.is<typeof b, StaticError>()

		// // @ts-expect-error missing className prop
		// ;() => style({} as unknown as FC<{ href: string }>)
		const c = style({} as unknown as FC<{ href: string }>)
		Assert.is<typeof c, StaticError>()

		// ...better!
		;() => style({} as unknown as FC<{ href: string; className?: string }>)

		//

		// // @ts-expect-error missing className prop
		// ;() => style({} as unknown as (props: { a: 1 }) => ReactElement)
		const dd = style({} as unknown as (props: { a: 1 }) => ReactElement)
		Assert.is<typeof dd, StaticError>()

		// ...better!
		;() =>
			style(
				{} as unknown as (props: {
					a: 1
					className?: string | undefined
				}) => ReactElement,
			)

		//

		//

		// also good
		type DInner = (props: {
			readonly className: string
			otherRequired: string
		}) => ReactElement

		const d = () => style({} as unknown as DInner)

		type D = ReturnType<typeof d>

		Assert<IsIdentical<D, StyledComponent<{}, DInner>>>()
	})
})
