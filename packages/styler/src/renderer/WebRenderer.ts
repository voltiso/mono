// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import {
	assignStyle,
	cssifyDeclaration,
	isUnitlessProperty,
	resolveArrayValue,
} from 'css-in-js-utils'
import type { StyleObject } from 'css-in-js-utils/es/cssifyObject'

import type { Css } from '../Css'
import { isServerComponent } from '../util/isServerComponent'

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

function getAtomicStyles(...stylerStyles: Css[]) {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
	const stylerStyle: StyleObject | null = (assignStyle as any)(...stylerStyles)

	const result = [] as string[]

	for (const [k, v] of Object.entries(stylerStyle || {})) {
		const singleValue = Array.isArray(v) ? resolveArrayValue(k, v as never) : v

		const finalValue =
			typeof singleValue === 'number' &&
			singleValue !== 0 &&
			!isUnitlessProperty(k)
				? `${singleValue}px`
				: singleValue

		const content = cssifyDeclaration(k, finalValue as never)
		result.push(content)
	}

	return result
}

//

export function getClassCss(className: string, content: string) {
	return `.${className}{${content}}`
}

export class WebRenderer {
	_cache = new Map<string, string>()

	_styleToFlush = ''
	numFlushes = 0

	classNameFor(...stylerStyles: Css[]) {
		const atomicStyles = getAtomicStyles(...stylerStyles)

		// ! .map with side effects
		const classNames = atomicStyles.map(content => {
			let className = this._cache.get(content)

			if (!className) {
				// eslint-disable-next-line no-magic-numbers
				className = this._cache.size.toString(36)

				if (isServerComponent) className = `S${className}` // server component
				if (!Number.isNaN(Number(className[0]))) className = `_${className}`
				this._cache.set(content, className)

				// if (typeof document !== 'undefined') {
				// 	const headStyleElement = getHeadStyleElement()
				// 	const cssText = `.${className}{${content}}`
				// 	// console.log({ cssText })
				// 	headStyleElement.append(cssText)
				// }

				this._styleToFlush += getClassCss(className, content)
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
		return style
	}

	unflushStyle() {
		this._styleToFlush = [...this._cache.entries()]
			.map(([k, v]) => getClassCss(v, k))
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
