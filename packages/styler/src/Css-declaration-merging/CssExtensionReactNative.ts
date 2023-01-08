// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CssExtension } from './CssExtension'

/**
 * Define additional accepted value types for existing CSS property names
 *
 * - Use TS declaration merging
 */
export interface CssExtensionReactNative<CustomCss extends object>
	extends CssExtension<CustomCss> {
	//
}
