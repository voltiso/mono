// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import {
	cssifyDeclaration,
	isUnitlessProperty,
	resolveArrayValue,
} from 'css-in-js-utils'

import type { RelaxedCss } from '~/Css'

import type { AtomicStyle } from './AtomicStyle'
import { mergeCss } from './mergeCss'
import { parseSelectors } from './parseSelectors'

export function combineNestedSelectors(outer: string[], inner: string[]) {
	const result = [] as string[]

	for (const a of outer) {
		for (const b of inner) {
			const aa = ` ${a}`
			const lastSpaceIdx = aa.lastIndexOf(' ')

			const aPrefix = aa.slice(1, lastSpaceIdx)
			const aSuffix = aa.slice(lastSpaceIdx + 1)

			// console.log('combineNestedSelectors a', a, aPrefix, aSuffix)

			const bPart = b.replace(/&/gu, aSuffix)

			result.push(aPrefix ? `${aPrefix} ${bPart}` : bPart)
		}
	}

	// console.log('combineNestedSelectors', outer, inner, result)

	return result
}

//

export function getAtomicStyles(...stylerStyles: RelaxedCss[]): AtomicStyle[] {
	const stylerStyle = mergeCss(...stylerStyles)

	const result = [] as AtomicStyle[]

	for (const [k, v] of Object.entries(stylerStyle)) {
		if (typeof v === 'object') {
			const outer = parseSelectors(k)
			const inners = getAtomicStyles(v as never)

			const newResult = [] as AtomicStyle[]

			// n^2 results
			for (const inner of inners) {
				newResult.push({
					style: inner.style,
					selectors: combineNestedSelectors(outer.selectors, inner.selectors),
					mediaQueries: [...outer.mediaQueries, ...inner.mediaQueries],
				})
			}

			result.push(...newResult)
		} else {
			const singleValue: unknown = Array.isArray(v)
				? resolveArrayValue(k, v as never)
				: v

			const finalValue =
				typeof singleValue === 'number' &&
				singleValue !== 0 &&
				!isUnitlessProperty(k)
					? `${singleValue}px`
					: singleValue

			const style = cssifyDeclaration(k, finalValue as never)

			// console.log('!!', style)

			result.push({
				style,
				selectors: ['&'],
				mediaQueries: [],
			})
		}
	}

	return result
}
