// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	ComponentPropsWithRef_,
	ElementTypeLike,
	FastMergeProps_,
} from '~'

// /** Distribute over `P` and `C` */
// export type $GetStyledProps<P, C> = P extends any
// 	? C extends null
// 		? P
// 		: C extends ComponentClassLike<infer PP>
// 		? MergeProps_<PP, P>
// 		: C extends FunctionComponentLike<infer PP>
// 		? MergeProps_<PP, P>
// 		: C extends string
// 		? C extends keyof JSX.IntrinsicElements
// 			? MergeProps_<JSX.IntrinsicElements[C], P>
// 			: never
// 		: never
// 	: never

/** Distribute over `P` and `C` */
export type $GetStyledProps<P, C> = P extends any
	? C extends null
		? P
		: C extends ElementTypeLike
		? FastMergeProps_<ComponentPropsWithRef_<C>, P>
		: never
	: never
