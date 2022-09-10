// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
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
export interface CssWeb
	extends CssOverridesWeb,
		// eslint-disable-next-line etc/no-internal
		_Css_WithExtensionWeb,
		// eslint-disable-next-line etc/no-internal
		_Css_OriginalWeb {}

export interface CssPropertiesWeb
	extends csstype.Properties<number | string>,
		CssProperties {}

/**
 * CSS properties and pseudos
 *
 * - To add custom CSS properties, use TS declaration merging
 */
export interface CssPropertiesAndPseudosWeb
	extends CssPropertiesWithArraysWeb,
		CssPseudosWeb {}
