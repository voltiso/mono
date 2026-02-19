// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CssOverrides<_CustomCss extends object> {
	//
}

export interface CssOverridesWeb<
	CustomCss extends object,
> extends CssOverrides<CustomCss> {}

export interface CssOverridesReactNative<
	CustomCss extends object,
> extends CssOverrides<CustomCss> {}
