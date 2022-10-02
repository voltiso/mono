// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	Css,
	ForwardRefAndCssRenderFunction,
	InnerProps,
	NativeElement,
} from '~'

import type {
	IntrinsicElementLike,
	IStylableIntrinsic,
} from './_/StylableIntrinsic'
import type {
	IStylableJsxCall,
	StylableJsxCallLike,
} from './_/StylableJsxCall/StylableJsxCall'
import type {
	IStylableJsxConstruct,
	StylableJsxConstructLike,
} from './_/StylableJsxConstruct/StylableJsxConstruct'

export type StylableLike =
	| StylableJsxCallLike
	| StylableJsxConstructLike
	| IntrinsicElementLike
	| ForwardRefAndCssRenderFunction<any>

/** Element types that can be styled using style(...) */
export type IStylable =
	| IStylableJsxCall
	| IStylableJsxConstruct
	| IStylableIntrinsic
	| ForwardRefAndCssRenderFunction<NativeElement, Css, InnerProps>
