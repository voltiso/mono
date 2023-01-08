// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CssPropertiesReactNative } from '~/Css-declaration-merging'

import type { CssExtensionReactNative } from '../Css-declaration-merging/CssExtensionReactNative'
import type { CssOverridesReactNative } from '../Css-declaration-merging/CssOverrides'

/** @internal */
export type _Css_WithExtensionReactNative<CustomCss extends object> = {
	[k in keyof CssExtensionReactNative<CustomCss>]:
		| CssExtensionReactNative<CustomCss>[k]
		| (k extends keyof CssPropertiesReactNative
				? CssPropertiesReactNative[k]
				: unknown)
}

/** @internal */
export type _Css_OriginalReactNative<CustomCss extends object> = Omit<
	CssPropertiesReactNative,
	| keyof CssExtensionReactNative<CustomCss>
	| keyof CssOverridesReactNative<CustomCss>
>
