// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AlsoAccept } from '@voltiso/util'

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
	animationName?:
		| {
				from?: CssWeb<CustomCss> | undefined
				to?: CssWeb<CustomCss> | undefined
				'0%'?: CssWeb<CustomCss> | undefined
				'25%'?: CssWeb<CustomCss> | undefined
				'33%'?: CssWeb<CustomCss> | undefined
				'50%'?: CssWeb<CustomCss> | undefined
				'67%'?: CssWeb<CustomCss> | undefined
				'75%'?: CssWeb<CustomCss> | undefined
				'100%'?: CssWeb<CustomCss> | undefined
				[k: string]: CssWeb<CustomCss> | undefined
		  }
		| undefined

	/** Embed `font-face` */
	fontFace?:
		| {
				fontFamily?: 'Arial' | AlsoAccept<string> | undefined
				fontWeight?: number | undefined
				src?: (string | undefined)[] | undefined
		  }
		| undefined
}
