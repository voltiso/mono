// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ImageStyle, TextStyle, ViewStyle } from 'react-native'

import type {
	_Css_OriginalReactNative,
	_Css_WithExtensionReactNative,
	MergeCss3,
} from '~/Css'

import type { CssOverridesReactNative } from './CssOverrides'
import type { CssProperties } from './CssProperties'

/**
 * CSS properties (after allowing arrays)
 *
 * - To add custom CSS properties, use TS declaration merging
 */
export interface CssReactNative<CustomCss extends object>
	extends CssOverridesReactNative<CustomCss>,
		_Css_WithExtensionReactNative<CustomCss>,
		_Css_OriginalReactNative<CustomCss> {}

export interface CssPropertiesReactNative
	extends MergeCss3<ViewStyle, TextStyle, ImageStyle>,
		CssProperties {}
