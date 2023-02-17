// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Css } from '../Css'
import { isServerComponent } from '../util/isServerComponent'
import { getAtomicStyles } from './_/getAtomicStyles'
import { getHash } from './_/getHash'
import { groupAtomicStyles } from './_/groupAtomicStyles'
import { stringFromAtomicStyle } from './_/stringFromAtomicStyle'

//

export class WebRenderer {
	_cache = new Map<string, string>()

	_styleToFlush = ''
	numFlushes = 0

	classNameFor(...stylerStyles: Css[]) {
		const atomicStyles = groupAtomicStyles(getAtomicStyles(...stylerStyles))

		// ! .map with side effects
		const classNames = atomicStyles.map(atomicStyle => {
			const atomicStyleStr = stringFromAtomicStyle(atomicStyle)
			let className = this._cache.get(atomicStyleStr)

			if (!className) {
				className = isServerComponent
					? getHash(atomicStyleStr)
					: // eslint-disable-next-line no-magic-numbers
					  this._cache.size.toString(36)

				if (!Number.isNaN(Number(className[0]))) className = `_${className}`
				this._cache.set(atomicStyleStr, className)

				// if (typeof document !== 'undefined') {
				// 	const headStyleElement = getHeadStyleElement()
				// 	const cssText = `.${className}{${content}}`
				// 	// console.log({ cssText })
				// 	headStyleElement.append(cssText)
				// }

				this._styleToFlush += atomicStyleStr.replace('&', `.${className}`)
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
			.map(([k, v]) => k.replace('&', `.${v}`))
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
