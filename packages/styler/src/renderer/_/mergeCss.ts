// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Css } from '~/Css'

export type FlatCss = Css & { _?: never }

export function mergeTwoFlatCss(a: FlatCss, b: FlatCss): FlatCss {
	const result: Record<string, unknown> = { ...a }
	for (const [k, v] of Object.entries(b)) {
		if (typeof v === 'object') {
			if (result[k]) result[k] = mergeTwoFlatCss(result[k] as never, v as never)
			else result[k] = v
		}
		// eslint-disable-next-line es-x/no-array-prototype-flat
		else result[k] = v // result[k] === undefined ? v : [result[k], v].flat()
	}
	return result
}

export function flattenCss(css: Css): FlatCss {
	if (!css._) return css as never

	const outer: Record<string, unknown> = { ...css }
	delete outer['_']

	const inner: Record<string, unknown> = flattenCss(css._ as never) as never

	for (const [k, v] of Object.entries(outer))
		if (typeof v === 'object') outer[k] = flattenCss(v as never)

	for (const [k, v] of Object.entries(inner))
		if (typeof v === 'object') inner[k] = flattenCss(v as never)

	return mergeTwoFlatCss(outer, inner)
}

export function mergeCss(...styles: Css[]): Css {
	// eslint-disable-next-line unicorn/no-array-reduce
	return styles.map(style => flattenCss(style)).reduce(mergeTwoFlatCss, {})
}
