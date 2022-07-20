// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { StyleProp } from 'react-native'

import type { Css } from '../Css.js'
import type { IsReactNative } from '../IsReactNative.js'
import type { Props } from '../react-types'

export interface OuterPropsBase extends Props {
	css?: Css | undefined
}

export interface WebOuterProps extends OuterPropsBase {
	className?: string | undefined
	style?: Css | undefined
}

export interface NativeOuterProps extends OuterPropsBase {
	className?: never
	style?: StyleProp<unknown> | undefined
}

export type OuterProps = IsReactNative extends true
	? NativeOuterProps
	: IsReactNative extends false
	? WebOuterProps
	: never
