// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as CSS from 'csstype'

import type {
	CssPropertiesAndPseudosWeb,
	CssPropertiesWeb,
	CssWeb,
} from '~/Css-declaration-merging/web'

import type { CssExtensionWeb } from '../Css-declaration-merging/CssExtensionWeb'
import type { CssOverridesWeb } from '../Css-declaration-merging/CssOverrides'

/** @internal */
export type _Css_WithExtensionWeb<CustomCss extends object> = {
	[k in keyof CssExtensionWeb<CustomCss>]:
		| CssExtensionWeb<CustomCss>[k]
		| (k extends keyof CssPropertiesAndPseudosWeb<CustomCss>
				? CssPropertiesAndPseudosWeb<CustomCss>[k]
				: never)
}

/** @internal */
export type _Css_OriginalWeb<CustomCss extends object> = Omit<
	CssPropertiesAndPseudosWeb<CustomCss>,
	keyof CssExtensionWeb<CustomCss> | keyof CssOverridesWeb<CustomCss>
>

//

export type CssPseudosWeb<CustomCss extends object> = {
	[K in CSS.Pseudos]?: CssWeb<CustomCss> | undefined
}

/** Allow arrays */
export type CssPropertiesWithArraysWeb = _WithArrays<CssPropertiesWeb>

export type _WithArrays<C> = {
	[k in keyof C]: C[k] | readonly C[k][]
}
