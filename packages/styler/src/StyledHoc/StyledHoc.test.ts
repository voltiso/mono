// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'
import type { ChangeEvent, FC, ReactElement, RefObject } from 'react'

import type { Css } from '../Css.js'
import type { Props } from '../react-types'
import type { Stylable } from '../Stylable'
import type { StylableIntrinsic } from '../Stylable/_/StylableIntrinsic'
import type { StylableJsxCall } from '../Stylable/_/StylableJsxCall'
import type { StylableJsxConstruct } from '../Stylable/_/StylableJsxConstruct'
import type { StyledComponent } from '../StyledComponent'
import type { StyledHoc } from './AutoStyledHoc.js'
import type { IStyledHoc, IStyledHocCall } from './IStyledHoc.js'
import type { StyledHocCall } from './StyledHoc.js'

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

		//
		;() => style(0 as unknown as StylableJsxCall<TextProps>)

		//
		;() => style(0 as unknown as StylableJsxConstruct<TextProps>)

		//
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

		// @ts-expect-error missing className prop
		;() => style({} as unknown as FC)

		// @ts-expect-error missing className prop
		;() => style({} as unknown as (props: {}) => ReactElement | null)

		// @ts-expect-error missing className prop
		;() => style({} as unknown as FC<{ href: string }>)

		// ...better!
		;() => style({} as unknown as FC<{ href: string; className?: string }>)

		//

		// @ts-expect-error missing className prop
		;() => style({} as unknown as (props: { a: 1 }) => ReactElement)

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
		const d = () =>
			style(
				{} as unknown as (props: {
					readonly className: string
					otherRequired: string
				}) => ReactElement,
			)

		type D = ReturnType<typeof d>

		Assert<
			IsIdentical<
				D,
				StyledComponent<{
					readonly className: string
					otherRequired: string
				}>
			>
		>()
	})
})
