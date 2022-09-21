// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CssReactNative, CssWeb } from '~/Css-declaration-merging'
import type { IsReactNative } from '~/IsReactNative'

export type Css<AdditionalCss extends object = {}> = IsReactNative extends true
	? CssReactNative<AdditionalCss>
	: CssWeb<AdditionalCss>

export type CustomCss<AdditionalCss extends object> = AdditionalCss &
	Css<AdditionalCss>

// export type CustomCss<AdditionalCss extends object> = Merge2Reverse_<
// 	AdditionalCss,
// 	Css<AdditionalCss>
// >
