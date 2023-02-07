// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import {
	cssifyDeclaration,
	isUnitlessProperty,
	resolveArrayValue,
} from 'css-in-js-utils'

import type { Css } from '../Css'
import { isServerComponent } from '../util/isServerComponent'
import { mergeCss } from './_/mergeCss'

// let headStyleElement: HTMLStyleElement | null

// function getHeadStyleElement() {
// 	if (!headStyleElement) {
// 		const ssrDataName = `voltiso-ssr`
// 		headStyleElement = document.head.querySelector(`style[data-${ssrDataName}]`)

// 		if (!headStyleElement) {
// 			headStyleElement = document.createElement('style')
// 			headStyleElement.setAttribute(`data-${ssrDataName}`, '')
// 			// headStyleElement.setAttribute('type', 'text/css')
// 			document.head.append(headStyleElement)
// 		}
// 	}

// 	return headStyleElement
// }

//

//

export interface AtomicStyle {
	style: string

	/** Must not include `*` */
	suffix: string

	/** Must include `*` */
	selectors: string[]
}

function stringFromAtomicStyle(
	atomicStyle: AtomicStyle,
	// className?: string | undefined,
): string {
	let selectors = atomicStyle.selectors

	if (selectors.length === 0) selectors = ['*']

	// if (className)
	// 	selectors = selectors.map(selector =>
	// 		selector.replace('*', `.${className}`),
	// 	)

	if (atomicStyle.suffix)
		selectors = selectors.map(selector => `${selector}${atomicStyle.suffix}`)

	const finalSelector = selectors.join(',')

	return `${finalSelector}{${atomicStyle.style}}`
}

export function getAtomicStyles(...stylerStyles: Css[]): AtomicStyle[] {
	const stylerStyle = mergeCss(...stylerStyles)

	const result = [] as AtomicStyle[]

	for (const [k, v] of Object.entries(stylerStyle)) {
		const suffix = k.startsWith(':') || k.startsWith('[') ? k : ''
		const selectors = k.includes('*') ? k.split(',') : []

		if (typeof v === 'object') {
			const moreStyles = getAtomicStyles(v as never)
			result.push(
				...moreStyles.map(atomicStyle => ({
					style: atomicStyle.style,
					suffix: `${suffix}${atomicStyle.suffix}`,
					selectors: [...selectors, ...atomicStyle.selectors],
				})),
			)
			continue
		}

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
		result.push({
			style,
			suffix,
			selectors,
		})
	}

	return result
}

//

export class WebRenderer {
	_cache = new Map<string, string>()

	_styleToFlush = ''
	numFlushes = 0

	classNameFor(...stylerStyles: Css[]) {
		const atomicStyles = getAtomicStyles(...stylerStyles)

		// ! .map with side effects
		const classNames = atomicStyles.map(atomicStyle => {
			const atomicStyleStr = stringFromAtomicStyle(atomicStyle)
			let className = this._cache.get(atomicStyleStr)

			if (!className) {
				// eslint-disable-next-line no-magic-numbers
				className = this._cache.size.toString(36)

				if (isServerComponent) className = `S${className}` // server component
				if (!Number.isNaN(Number(className[0]))) className = `_${className}`
				this._cache.set(atomicStyleStr, className)

				// if (typeof document !== 'undefined') {
				// 	const headStyleElement = getHeadStyleElement()
				// 	const cssText = `.${className}{${content}}`
				// 	// console.log({ cssText })
				// 	headStyleElement.append(cssText)
				// }

				this._styleToFlush += atomicStyleStr.replace('*', `.${className}`)
			}

			return className
		})

		return classNames.join(' ')
	}

	flushStyle() {
		if (!this._styleToFlush) return ''
		const style = this._styleToFlush
		this._styleToFlush = ''
		this.numFlushes += 1
		// console.log('flushStyle', style)
		return style
	}

	unflushStyle() {
		this._styleToFlush = [...this._cache.entries()]
			.map(([k, v]) => k.replace('*', `.${v}`))
			.join('')

		this.numFlushes = 0
	}

	isFlushed() {
		return !this._styleToFlush
	}
}

export function isWebRenderer(x: unknown): x is WebRenderer {
	return !!(x as WebRenderer | null)?.classNameFor
}

// export function getStyle(renderer: WebRenderer) {
// 	return [...renderer._cache.entries()].map(([k, v]) => `.${v}{${k}}`).join('')
// }

// export function getNodeList(renderer: WebRenderer) {
// 	return React.createElement(
// 		'style',
// 		{
// 			'data-voltiso': '',
// 		},
// 		getStyle(renderer),
// 	)
// }
