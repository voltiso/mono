// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as CSS from 'csstype'

import type {
	CssPropertiesAndPseudosWeb,
	CssPropertiesWeb,
	CssWeb,
} from '~/Css-declaration-merging/web'

import type { CssExtensionWeb } from '../Css-declaration-merging/CssExtensionWeb'
import type { CssOverridesWeb } from '../Css-declaration-merging/CssOverrides'

/** `Css` with additional properties */
export type CustomCssWeb<C extends {}> = C & CssWeb

/** @internal */
export type _Css_WithExtensionWeb = {
	[k in keyof CssExtensionWeb]:
		| CssExtensionWeb[k]
		| (k extends keyof CssPropertiesAndPseudosWeb
				? CssPropertiesAndPseudosWeb[k]
				: never)
}

/** @internal */
export type _Css_OriginalWeb = Omit<
	CssPropertiesAndPseudosWeb,
	keyof CssExtensionWeb | keyof CssOverridesWeb
>

//

/** Changes from `fela`: added `| undefined` */
export type CssPseudosWeb = { [K in CSS.Pseudos]?: CssWeb | undefined }

/** Allow arrays */
export type CssPropertiesWithArraysWeb = _WithArrays<CssPropertiesWeb>

export type _WithArrays<C> = {
	[k in keyof C]: C[k] | readonly C[k][]
}
