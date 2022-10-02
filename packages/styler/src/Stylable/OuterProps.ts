// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { StyleProp } from 'react-native'

import type { Css, CustomCss } from '~/Css'
import type { IsReactNative } from '~/IsReactNative'
import type { Props } from '~/react-types'

export interface OuterPropsBase<AdditionalCss extends object> extends Props {
	css?:
		| CustomCss<AdditionalCss>
		| readonly CustomCss<AdditionalCss>[]
		| undefined
}

export interface WebOuterProps<AdditionalCss extends object = {}>
	extends OuterPropsBase<AdditionalCss> {
	className?: string | undefined
	style?: Css | undefined
}

export interface NativeOuterProps<AdditionalCss extends object = {}>
	extends OuterPropsBase<AdditionalCss> {
	className?: never
	style?: StyleProp<unknown> | undefined
}

export type OuterProps<AdditionalCss extends object = {}> =
	IsReactNative extends true
		? NativeOuterProps<AdditionalCss>
		: IsReactNative extends false
		? WebOuterProps<AdditionalCss>
		: never
