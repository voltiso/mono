// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable etc/no-internal */

import type { ImageStyle, TextStyle, ViewStyle } from 'react-native'

import type { CssExtensionReactNative } from './CssExtensionReactNative'
import type { CssOverridesReactNative } from './CssOverrides'
import type { CssProperties } from './CssProperties'
import type { MergeCss3 } from './MergeCss'

/**
 * CSS properties (after allowing arrays)
 *
 * - To add custom CSS properties, use TS declaration merging
 */
export interface CssReactNative
	extends CssOverridesReactNative,
		_Css_WithExtensionReactNative,
		_Css_OriginalReactNative {}

/** `Css` with additional properties */
export type CustomCssReactNative<C> = C & CssReactNative

/** @internal */
export type _Css_WithExtensionReactNative = {
	[k in keyof CssExtensionReactNative]:
		| CssExtensionReactNative[k]
		| (k extends keyof CssPropertiesReactNative
				? CssPropertiesReactNative[k]
				: unknown)
}

/** @internal */
export type _Css_OriginalReactNative = Omit<
	CssPropertiesReactNative,
	keyof CssExtensionReactNative | keyof CssOverridesReactNative
>

export interface CssPropertiesReactNative
	extends MergeCss3<ViewStyle, TextStyle, ImageStyle>,
		CssProperties {}
