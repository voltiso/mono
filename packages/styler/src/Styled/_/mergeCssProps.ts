// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { getEntries, setProperty, tryGetProperty } from '@voltiso/util'

import type { IndexedCssProps, IndexedCssPropsSingle } from '~/_/CssProps'

export function mergeCssProps<CustomCss extends object>(
	a: IndexedCssProps<CustomCss>,
	b: IndexedCssProps<CustomCss> | IndexedCssPropsSingle<CustomCss> | undefined,
): IndexedCssProps<CustomCss> {
	if (!b) return a

	const r = { ...a }

	for (const [k, v] of getEntries(b)) {
		// const values = (
		// 	Array.isArray(r[k]) ? r[k] : r[k] ? [r[k]] : []
		// ) as ICssProp[]

		const values = tryGetProperty(r, k) || []

		const moreValues = Array.isArray(v) ? v : [v]

		setProperty(r, k, [...values, ...moreValues])
	}

	return r
}
