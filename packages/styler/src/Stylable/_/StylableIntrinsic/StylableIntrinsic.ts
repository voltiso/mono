// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsReactNative } from '~/IsReactNative'
import type { Props } from '~/react-types'

//! slow - not needed with all JSX properties being optional
// type StylableIntrinsic<P extends Props> = IsReactNative extends false
// 	? {
// 			[k in keyof JSX.IntrinsicElements]: Required<
// 				JSX.IntrinsicElements[k]
// 			> extends Omit<P, 'ref'> & Required<InnerProps>
// 				? k
// 				: never
// 	  }[keyof JSX.IntrinsicElements]
// 	: never

//! still slow
export type StylableIntrinsic_<P extends Props> = P extends any
	? IsReactNative extends false
		? Partial<P> extends P
			? {
					[k in keyof JSX.IntrinsicElements]: keyof P extends keyof JSX.IntrinsicElements[k]
						? P extends JSX.IntrinsicElements[k]
							? k
							: never
						: never
			  }[keyof JSX.IntrinsicElements]
			: never
		: never
	: never

//! faster
// type StylableIntrinsic<P extends Props> = P extends unknown
// 	? IsReactNative extends false
// 		? Partial<P> extends P
// 			? keyof JSX.IntrinsicElements
// 			: never
// 		: never
// 	: never

//

export type IntrinsicElementLike = IsReactNative extends false ? string : never

export type IStylableIntrinsic = IsReactNative extends false
	? keyof JSX.IntrinsicElements
	: never

// export type IStylableIntrinsic = IsReactNative extends false
// 	? {
// 			[k in keyof JSX.IntrinsicElements]: Required<
// 				JSX.IntrinsicElements[k]
// 			> extends Required<InnerProps>
// 				? k
// 				: never
// 	  }[keyof JSX.IntrinsicElements]
// 	: never
