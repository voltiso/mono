// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type React from 'react'

import type { Props } from '~/react-types'
import type { IsReactNative } from '~/util'

// ! slow - not needed with all JSX properties being optional
// type StylableIntrinsic<P extends Props> = IsReactNative extends false
// 	? {
// 			[k in keyof JSX.IntrinsicElements]: Required<
// 				JSX.IntrinsicElements[k]
// 			> extends Omit<P, 'ref'> & Required<InnerProps>
// 				? k
// 				: never
// 	  }[keyof JSX.IntrinsicElements]
// 	: never

// ! still slow
export type StylableIntrinsicElement_<P extends Props> = P extends any
	? IsReactNative extends false
		? Partial<P> extends P
			? {
					[k in keyof React.JSX.IntrinsicElements]: keyof P extends keyof React.JSX.IntrinsicElements[k]
						? P extends React.JSX.IntrinsicElements[k]
							? k
							: never
						: never
				}[keyof React.JSX.IntrinsicElements]
			: never
		: never
	: never

// ! faster
// type StylableIntrinsic<P extends Props> = P extends unknown
// 	? IsReactNative extends false
// 		? Partial<P> extends P
// 			? keyof JSX.IntrinsicElements
// 			: never
// 		: never
// 	: never

//

export type IntrinsicElementLike = IsReactNative extends false ? string : never

export type IntrinsicElement = IsReactNative extends false
	? keyof React.JSX.IntrinsicElements
	: never

// eslint-disable-next-line sonarjs/redundant-type-aliases
export type IStylableIntrinsicElement = IntrinsicElement

// export type IStylableIntrinsic = IsReactNative extends false
// 	? {
// 			[k in keyof JSX.IntrinsicElements]: Required<
// 				JSX.IntrinsicElements[k]
// 			> extends Required<InnerProps>
// 				? k
// 				: never
// 	  }[keyof JSX.IntrinsicElements]
// 	: never
