// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	CssPropertiesReactNative,
	CssReactNative,
} from '~/Css-declaration-merging'

import type { CssExtensionReactNative } from '../Css-declaration-merging/CssExtensionReactNative'
import type { CssOverridesReactNative } from '../Css-declaration-merging/CssOverrides'

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
