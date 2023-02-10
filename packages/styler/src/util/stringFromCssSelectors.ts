/* eslint-disable @typescript-eslint/restrict-template-expressions */
// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { hyphenateProperty, isUnitlessProperty } from 'css-in-js-utils'

import type { Css } from '~/Css/Css'
import type { CssSelectors } from '~/Css/defineCss'

function escapeValue(str: string) {
	if (!str.includes('\\') && !str.includes("'") && !str.includes('"'))
		return str

	const testStr = str
		.replace(/\\\\/gu, '')
		.replace(/\\'/gu, '')
		.replace(/\\"/gu, '')

	let current = ''
	for (const c of testStr) {
		if (c === current) current = ''
		else if (!current && (c === "'" || c === '"')) current = c
	}

	if (!current) return str

	return 'error-no-matching-quote'
}

export function stringFromCss(css: Css): string {
	return (
		Object.entries(css)
			// eslint-disable-next-line @typescript-eslint/no-unsafe-return
			.map(([k, v]) => [k.startsWith('-') ? k : hyphenateProperty(k), v])
			.map(([k, v]) =>
				typeof v === 'string'
					? `${k}:${escapeValue(v)};`
					: typeof v === 'object'
					? `${k}{${stringFromCss(v)}}`
					: isUnitlessProperty(k)
					? `${k}:${v};`
					: `${k}:${v}px;`,
			)
			.join('')
	)
}

export function stringFromCssSelectors(cssSelectors: CssSelectors) {
	return Object.entries(cssSelectors)
		.map(([k, v]) => `${k}{${stringFromCss(v as never)}}`)
		.join('')
}
