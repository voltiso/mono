// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { hyphenateProperty } from 'css-in-js-utils'
import type { Css } from '~/Css/Css'

import type { CssSelectors } from '~/Css/defineCss'

export function stringFromCss(css: Css): string {
	return Object.entries(css)
		.map(([k, v]) => [k.startsWith('-') ? k : hyphenateProperty(k), v])
		.map(([k, v]) => `${k}:${v};`)
		.join('')
}

export function stringFromCssSelectors(cssSelectors: CssSelectors) {
	return Object.entries(cssSelectors)
		.map(([k, v]) => `${k}{${stringFromCss(v as never)}}`)
		.join('')
}
