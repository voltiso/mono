// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { cssifyObject } from 'css-in-js-utils'

import type { CssSelectors } from '~/Css/defineCss'

export function stringFromCssSelectors(cssSelectors: CssSelectors) {
	return Object.entries(cssSelectors)
		.map(([k, v]) => `${k}{${cssifyObject(v as never)}}`)
		.join('')
}
