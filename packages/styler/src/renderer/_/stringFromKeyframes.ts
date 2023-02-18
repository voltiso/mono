import { cssifyObject } from 'css-in-js-utils'
import type { Keyframes } from '~/Css'

export function stringFromKeyframes(keyframes: Keyframes) {
	return Object.entries(keyframes)
		.map(([k, v]) => `${k}{${cssifyObject(v as never)}}`)
		.join('')
}
