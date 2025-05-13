// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ForwardRefRenderFunction } from 'react'

import type { Css } from '~/Css'
import type { ForwardRefAndCssRenderFunction } from '~/react-types'
import type { NativeElement } from '~/StyledComponent'

import type {
	IntrinsicElementLike,
	IStylableIntrinsicElement,
} from './_/StylableIntrinsic'
import type {
	IStylableJsxCall,
	StylableJsxCallLike,
} from './_/StylableJsxCall/StylableJsxCall'
import type {
	IStylableJsxConstruct,
	StylableJsxConstructLike,
} from './_/StylableJsxConstruct/StylableJsxConstruct'
import type { InnerProps } from './InnerProps'

export type StylableLike =
	| StylableJsxCallLike
	| StylableJsxConstructLike
	| IntrinsicElementLike

/** Element types that can be styled using style(...) */
export type IStylable =
	| IStylableJsxCall
	| IStylableJsxConstruct
	| IStylableIntrinsicElement

//

export type StylableRenderFunctionLike =
	| ForwardRefRenderFunction<any, any>
	| ForwardRefAndCssRenderFunction<any>

export type IStylableRenderFunction =
	| ForwardRefRenderFunction<NativeElement, InnerProps>
	| ForwardRefAndCssRenderFunction<NativeElement, Css, InnerProps>

export type StylableRenderFunction<
	Element extends NativeElement,
	CustomCss extends {},
> =
	| ForwardRefRenderFunction<Element, InnerProps>
	| ForwardRefAndCssRenderFunction<Element, CustomCss, InnerProps>
