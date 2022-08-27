// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { StyleProp } from 'react-native'

import type { Css, CustomCss } from '~/Css'
import type { IsReactNative } from '~/IsReactNative'
import type { Props } from '~/react-types'

export interface OuterPropsBase<AdditionalProperties = {}> extends Props {
	css?: CustomCss<AdditionalProperties> | undefined
}

export interface WebOuterProps<CustomCss = {}>
	extends OuterPropsBase<CustomCss> {
	className?: string | undefined
	style?: Css | undefined
}

export interface NativeOuterProps<CustomCss = {}>
	extends OuterPropsBase<CustomCss> {
	className?: never
	style?: StyleProp<unknown> | undefined
}

export type OuterProps<CustomCss = {}> = IsReactNative extends true
	? NativeOuterProps<CustomCss>
	: IsReactNative extends false
	? WebOuterProps<CustomCss>
	: never
