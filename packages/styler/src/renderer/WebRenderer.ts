// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Keyframes } from '~/Css/Keyframes'
import type { Css } from '../Css'
import { isServerComponent } from '../util/isServerComponent'
import { getAtomicStyles } from './_/getAtomicStyles'
import { getHash } from './_/getHash'
import { groupAtomicStyles } from './_/groupAtomicStyles'
import { stringFromAtomicStyle } from './_/stringFromAtomicStyle'
import { stringFromKeyframes } from './_/stringFromKeyframes'

//

export class WebRenderer {
	_classNames = new Map<string, string>()
	_keyframes = new Map<string, string>()

	_styleToFlush = ''
	numFlushes = 0

	classNameFor(...stylerStyles: Css[]) {
		const atomicStyles = groupAtomicStyles(
			getAtomicStyles(this, ...stylerStyles),
		)

		// ! .map with side effects
		const classNames = atomicStyles.map(atomicStyle => {
			const atomicStyleStr = stringFromAtomicStyle(atomicStyle)
			let className = this._classNames.get(atomicStyleStr)

			if (!className) {
				className = isServerComponent
					? getHash(atomicStyleStr)
					: // eslint-disable-next-line no-magic-numbers
					  this._classNames.size.toString(36)

				if (!Number.isNaN(Number(className[0]))) className = `_${className}`
				this._classNames.set(atomicStyleStr, className)

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

	animationNameFor(keyframes: Keyframes) {
		const keyframesStr = stringFromKeyframes(keyframes)
		// console.log({ keyframes, keyframesStr })

		let animationName = this._keyframes.get(keyframesStr)

		if (!animationName) {
			animationName = isServerComponent
				? getHash(keyframesStr)
				: // eslint-disable-next-line no-magic-numbers
				  this._keyframes.size.toString(36)

			if (!Number.isNaN(Number(animationName[0])))
				animationName = `_${animationName}`
			this._keyframes.set(keyframesStr, animationName)

			this._styleToFlush += `@keyframes ${animationName}{${keyframesStr}}`
		}

		return animationName
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
		this._styleToFlush = [...this._classNames.entries()]
			.map(([k, v]) => k.replace('&', `.${v}`))
			.join('')

		this._styleToFlush += [...this._keyframes.entries()]
			.map(([k, v]) => `@keyframes ${v}{${k}}`)
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
