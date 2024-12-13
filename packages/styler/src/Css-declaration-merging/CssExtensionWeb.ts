// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AlsoAccept } from '@voltiso/util'

import type { Keyframes } from '~/Css/Keyframes'

import type { CssExtension } from './CssExtension'
import type { CssWeb } from './web'

/**
 * Define additional accepted value types for existing CSS property names
 *
 * - Use TS declaration merging
 */
export interface CssExtensionWeb<CustomCss extends object>
	extends CssExtension<CustomCss> {
	':nth-child(odd)'?: CssWeb<CustomCss> | undefined
	':nth-child(even)'?: CssWeb<CustomCss> | undefined

	/** Embed `animation-name` */
	animationName?: string | Keyframes | undefined

	/** Embed `font-face` */
	fontFace?:
		| {
				fontFamily?: 'Arial' | AlsoAccept<string> | undefined
				fontWeight?: number | undefined
				src?: (string | undefined)[] | undefined
		  }
		| undefined
}
