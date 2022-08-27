// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CssWeb, CustomCssWeb, IsReactNative } from '~'

import type { CssReactNative, CustomCssReactNative } from './react-native'

export type Css = IsReactNative extends true ? CssReactNative : CssWeb

export type CustomCss<C> = IsReactNative extends true
	? CustomCssReactNative<C>
	: CustomCssWeb<C>
