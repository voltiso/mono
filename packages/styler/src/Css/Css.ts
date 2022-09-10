// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CssReactNative, CssWeb } from '~/Css-declaration-merging'
import type { IsReactNative } from '~/IsReactNative'

import type { CustomCssReactNative } from './react-native'
import type { CustomCssWeb } from './web'

export type Css = IsReactNative extends true ? CssReactNative : CssWeb

export type CustomCss<C extends {}> = IsReactNative extends true
	? CustomCssReactNative<C>
	: CustomCssWeb<C>
