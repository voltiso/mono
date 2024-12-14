// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable es-x/no-class-instance-fields */

import type { Unit } from '~/_/StyledData/IStyledData'
import type { Keyframes } from '~/Css/Keyframes'

import type { Css } from '../Css'
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

	// _options: { unit: Unit }

	// constructor(options: { unit: Unit }) {
	// 	this._options = options
	// }

	classNameFor(options: { unit: Unit }, ...stylerStyles: Css[]): string {
		const atomicStyles = groupAtomicStyles(
			getAtomicStyles(options, this, ...stylerStyles),
		)

		// ! .map with side effects
		const classNames = atomicStyles.map(atomicStyle => {
			const atomicStyleStr = stringFromAtomicStyle(options, atomicStyle)
			let className = this._classNames.get(atomicStyleStr)

			if (!className) {
				className = getHash(atomicStyleStr)

				if (!Number.isNaN(Number(className[0]))) className = `_${className}`
				this._classNames.set(atomicStyleStr, className)

				this._styleToFlush += atomicStyleStr.replace(/&/gu, `.${className}`)
			}

			return className
		})

		return classNames.join(' ')
	}

	animationNameFor(options: { unit: Unit }, keyframes: Keyframes): string {
		const keyframesStr = stringFromKeyframes(options, keyframes)
		// console.log({ keyframes, keyframesStr })

		let animationName = this._keyframes.get(keyframesStr)

		if (!animationName) {
			animationName = getHash(keyframesStr)

			if (!Number.isNaN(Number(animationName[0])))
				animationName = `_${animationName}`
			this._keyframes.set(keyframesStr, animationName)

			this._styleToFlush += `@keyframes ${animationName}{${keyframesStr}}`
		}

		return animationName
	}

	flushStyle(): string {
		if (!this._styleToFlush) return ''
		const style = this._styleToFlush
		this._styleToFlush = ''
		this.numFlushes += 1
		// console.log('flushStyle', style)
		return style
	}

	unflushStyle(): void {
		this._styleToFlush = [...this._classNames.entries()]
			.map(([k, v]) => k.replace(/&/gu, `.${v}`))
			.join('')

		this._styleToFlush += [...this._keyframes.entries()]
			.map(([k, v]) => `@keyframes ${v}{${k}}`)
			.join('')

		this.numFlushes = 0
	}

	isFlushed(): boolean {
		return !this._styleToFlush
	}
}

export function isWebRenderer(x: unknown): x is WebRenderer {
	return !!(x as WebRenderer | null)?.classNameFor
}
