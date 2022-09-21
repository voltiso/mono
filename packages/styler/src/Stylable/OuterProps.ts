// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { StyleProp } from 'react-native'

import type { Css, CustomCss } from '~/Css'
import type { IsReactNative } from '~/IsReactNative'
import type { Props } from '~/react-types'

export interface OuterPropsBase<AdditionalCss extends object> extends Props {
	css?: CustomCss<AdditionalCss> | undefined
}

export interface WebOuterProps<CustomCss extends object = {}>
	extends OuterPropsBase<CustomCss> {
	className?: string | undefined
	style?: Css | undefined
}

export interface NativeOuterProps<CustomCss extends object = {}>
	extends OuterPropsBase<CustomCss> {
	className?: never
	style?: StyleProp<unknown> | undefined
}

export type OuterProps<CustomCss extends object = {}> =
	IsReactNative extends true
		? NativeOuterProps<CustomCss>
		: IsReactNative extends false
		? WebOuterProps<CustomCss>
		: never
