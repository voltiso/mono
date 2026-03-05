// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** Use declaration merging to add custom CSS overrides to both `web` and
 * `react-native`
 */

// biome-ignore lint/suspicious/noEmptyInterface: declaration merging
export interface CssOverrides<_CustomCss extends object> {
	//
}

export interface CssOverridesWeb<CustomCss extends object>
	extends CssOverrides<CustomCss> {}

export interface CssOverridesReactNative<CustomCss extends object>
	extends CssOverrides<CustomCss> {}
