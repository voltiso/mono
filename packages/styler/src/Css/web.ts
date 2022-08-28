// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable etc/no-internal */

import type * as CSS from 'csstype'

import type { CssExtensionWeb } from './CssExtensionWeb'
import type { CssOverridesWeb } from './CssOverrides'
import type { CssProperties } from './CssProperties'

/**
 * CSS properties (after allowing arrays)
 *
 * - To add custom CSS properties, use TS declaration merging
 */
export interface CssWeb
	extends CssOverridesWeb,
		_Css_WithExtensionWeb,
		_Css_OriginalWeb {}

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

export interface CssPropertiesWeb
	extends CSS.Properties<number | string>,
		CssProperties {}

/**
 * CSS properties and pseudos
 *
 * - To add custom CSS properties, use TS declaration merging
 */
export interface CssPropertiesAndPseudosWeb
	extends CssPropertiesWithArraysWeb,
		CssPseudosWeb {}

//

/** Changes from `fela`: added `| undefined` */
export type CssPseudosWeb = { [K in CSS.Pseudos]?: CssWeb | undefined }

/** Allow arrays */
export type CssPropertiesWithArraysWeb = _WithArrays<CssPropertiesWeb>

export type _WithArrays<C> = {
	[k in keyof C]: C[k] | readonly C[k][]
}

// export type CustomCss<AdditionalProperties> =
// 	CustomCssObject<AdditionalProperties>

/**
 * Copied over `IStyle` from `fela` with fixes for `exactOptionalPropertyTypes`
 *
 * - Disabled CssCustom - we'll explicitly add typings if something's missing
 * - No extension CSS - moved to a separate `CssExtension` type
 */
// export type Css = CssObject /* | CssCustom | IStyleExtension */

// export type CssObject = CssProperties & CssPseudos

// interface IStyleExtension {
// 	__brand?: never
// }

// interface IStylePrimitiveExtension {
// 	_string: string
// 	_number: number
// }

//

//

// export type CssExtension = IStyleExtension | CssCustom

/**
 * Changes from `fela`:
 *
 * - Add `| undefined`
 */
// export interface CssCustom {
// 	[prop: string]: CssCustomPrimitive | Css | undefined
// }
// export type CssCustomPrimitive =
// 	IStylePrimitiveExtension[keyof IStylePrimitiveExtension]
