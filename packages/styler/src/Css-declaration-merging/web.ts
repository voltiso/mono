// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as csstype from 'csstype'

import type {
	_Css_OriginalWeb,
	_Css_WithExtensionWeb,
	CssPropertiesWithArraysWeb,
	CssPseudosWeb,
} from '~/Css'

import type { CssOverridesWeb } from './CssOverrides'
import type { CssProperties } from './CssProperties'

/**
 * CSS properties (after allowing arrays)
 *
 * - To add custom CSS properties, use TS declaration merging
 */
export interface CssWeb<CustomCss extends object>
	extends CssOverridesWeb<CustomCss>,
		// eslint-disable-next-line etc/no-internal
		_Css_WithExtensionWeb<CustomCss>,
		// eslint-disable-next-line etc/no-internal
		_Css_OriginalWeb<CustomCss> {}

export interface CssPropertiesWeb
	extends csstype.Properties<number | string>,
		CssProperties {}

/**
 * CSS properties and pseudos
 *
 * - To add custom CSS properties, use TS declaration merging
 */
export interface CssPropertiesAndPseudosWeb<CustomCss extends object>
	extends CssPropertiesWithArraysWeb,
		CssPseudosWeb<CustomCss> {}
