// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AlsoAccept } from '@voltiso/util'

import type { CssExtension } from './CssExtension'
import type { CssWeb } from './web'

/**
 * Define additional accepted value types for existing CSS property names
 *
 * - Use TS declaration merging
 */
export interface CssExtensionWeb extends CssExtension {
	':nth-child(odd)'?: CssWeb | undefined
	':nth-child(even)'?: CssWeb | undefined

	/** Typings for `fela-plugin-embedded` */
	animationName?:
		| {
				from?: CssWeb | undefined
				to?: CssWeb | undefined
				'0%'?: CssWeb | undefined
				'25%'?: CssWeb | undefined
				'33%'?: CssWeb | undefined
				'50%'?: CssWeb | undefined
				'67%'?: CssWeb | undefined
				'75%'?: CssWeb | undefined
				'100%'?: CssWeb | undefined
				[k: string]: CssWeb | undefined
		  }
		| undefined

	/** Typings for `fela-plugin-embedded` */
	fontFace?:
		| {
				fontFamily?: 'Arial' | AlsoAccept<string> | undefined
				fontWeight?: number | undefined
				src?: (string | undefined)[] | undefined
		  }
		| undefined
}
