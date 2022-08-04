// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// import { IStyle } from 'fela'
import type * as CSS from 'csstype'
import type { IStyleExtension, IStylePrimitiveExtension } from 'fela'
import type { ImageStyle, TextStyle, ViewStyle } from 'react-native'

import type { IsReactNative } from './IsReactNative'

type AllowArrays<O> = O extends any
	? { [k in keyof O]: O[k] | readonly O[k][] }
	: never

/** Copied over `IStyle` from `fela` with fixes for `exactOptionalPropertyTypes` */
export type Css = AllowArrays<CssObject | CssCustom | IStyleExtension>

export type CssObject = CssProperties & CssPseudos

/**
 * Changes from `fela`:
 *
 * - Add `| undefined`
 */
export interface CssCustom {
	[prop: string]: CssCustomPrimitive | Css | undefined
}
type CssCustomPrimitive =
	IStylePrimitiveExtension[keyof IStylePrimitiveExtension]

type CssProperties = IsReactNative extends true
	? ViewStyle | TextStyle | ImageStyle
	: CSS.Properties<number | string>
// type CssPropertiesFallback = CSS.PropertiesFallback<number | string>

/** Changes from `fela`: added `| undefined` */
type CssPseudos = IsReactNative extends true
	? {}
	: { [K in CSS.Pseudos]?: CssObject | undefined }

// interface IStyleExtension {
// 	__brand?: never
// }

// interface IStylePrimitiveExtension {
// 	_string: string
// 	_number: number
// }
