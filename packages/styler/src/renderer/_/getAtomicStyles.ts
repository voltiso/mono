// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable max-depth */

import type { RelaxedCss } from '~/Css'

import type { AtomicStyle } from './AtomicStyle'
import { mergeCss } from './mergeCss'
import { parseSelectors } from './parseSelectors'

export function combineNestedSelectors(
	outer: string[],
	inner: string[],
): string[] {
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

	for (const [k, v] of Object.entries(stylerStyle) as [string, unknown][]) {
		if (typeof v === 'object') {
			const outer = parseSelectors(k)
			const inners = getAtomicStyles(v as never)

			if (outer.mediaQueries.length > 0) {
				for (const inner of inners) {
					for (const override of inner.overrides) {
						override.mediaQueries = [
							...outer.mediaQueries,
							...override.mediaQueries,
						]
					}
				}
			}

			if (outer.selectors.length > 1 || outer.selectors[0] !== '&') {
				for (const inner of inners) {
					inner.selectors = combineNestedSelectors(
						outer.selectors,
						inner.selectors,
					)
				}
			}

			result.push(...inners)
		} else {
			// const singleValue: unknown = Array.isArray(v)
			// 	? resolveArrayValue(k, v as never)
			// 	: v

			// const finalValue =
			// 	typeof singleValue === 'number' &&
			// 	singleValue !== 0 &&
			// 	!isUnitlessProperty(k)
			// 		? `${singleValue}px`
			// 		: singleValue

			// const style = cssifyDeclaration(k, finalValue as never)

			// console.log('!!', style)

			result.push({
				property: k,
				selectors: ['&'],

				overrides: [
					{
						mediaQueries: [],
						// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
						values: Array.isArray(v) ? v : [v],
					},
				],
			})
		}
	}

	return result
}
