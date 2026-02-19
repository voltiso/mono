// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Css } from '~/Css'

export type FlatCss = Css & { _?: never }

export function mergeTwoFlatCss(a: FlatCss, b: FlatCss): FlatCss {
	const result: Record<string, unknown> = { ...a }
	for (const [k, v] of Object.entries(b)) {
		if (typeof v === 'object') {
			if (result[k]) result[k] = mergeTwoFlatCss(result[k] as never, v as never)
			else result[k] = v
		} else result[k] = v // result[k] === undefined ? v : [result[k], v].flat()
	}
	return result
}

function flattenNestedInPlace(css: Record<string, unknown>): void {
	for (const [k, v] of Object.entries(css))
		if (typeof v === 'object') css[k] = flattenCss(v as never)
}

export function flattenCss(css: Css): FlatCss {
	if (!css._) return css as never

	const outerA: Record<string, unknown> = {}
	const outerB: Record<string, unknown> = {}

	let foundInner = false
	for (const [k, v] of Object.entries(css)) {
		if (k === '_') foundInner = true
		else if (foundInner) outerB[k] = v
		else outerA[k] = v
	}

	const inner: Record<string, unknown> = flattenCss(css._ as never) as never

	flattenNestedInPlace(outerA)
	flattenNestedInPlace(inner)
	flattenNestedInPlace(outerB)

	return mergeTwoFlatCss(mergeTwoFlatCss(outerA, inner), outerB)
}

export function mergeCss(...styles: Css[]): Css {
	// eslint-disable-next-line unicorn/no-array-reduce
	return styles.map(style => flattenCss(style)).reduce(mergeTwoFlatCss, {})
}
