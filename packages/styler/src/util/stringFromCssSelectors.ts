// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { hyphenateProperty } from 'css-in-js-utils'
import type { Css } from '~/Css/Css'

import type { CssSelectors } from '~/Css/defineCss'

function escapeValue(str: string) {
	if (!str.includes('\\') && !str.includes("'") && !str.includes('"'))
		return str

	const testStr = str
		.replace(/\\\\/g, '')
		.replace(/\\'/g, '')
		.replace(/\\"/g, '')

	let current = ''
	for (const c of testStr) {
		if (c === current) current = ''
		else if (!current && (c === "'" || c === '"')) current = c
	}

	if (!current) return str

	return 'error-no-matching-quote'
}

export function stringFromCss(css: Css): string {
	return Object.entries(css)
		.map(([k, v]) => [k.startsWith('-') ? k : hyphenateProperty(k), v])
		.map(([k, v]) => `${k}:${escapeValue(v)};`)
		.join('')
}

export function stringFromCssSelectors(cssSelectors: CssSelectors) {
	return Object.entries(cssSelectors)
		.map(([k, v]) => `${k}{${stringFromCss(v as never)}}`)
		.join('')
}
