// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

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
					? // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
					  `${k}:${escapeValue(v)};`
					: // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
					isUnitlessProperty(k)
					? // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
					  `${k}:${v};`
					: // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
					  `${k}:${v}px;`,
			)
			.join('')
	)
}

export function stringFromCssSelectors(cssSelectors: CssSelectors) {
	return Object.entries(cssSelectors)
		.map(([k, v]) => `${k}{${stringFromCss(v as never)}}`)
		.join('')
}
