// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Keyframes } from '~/Css'

import { stringFromDeclaration } from './stringFromDeclaration'

export function stringFromKeyframes(keyframes: Keyframes) {
	return Object.entries(keyframes)
		.map(
			([k, v]) =>
				`${k}{${Object.entries(v as never)
					.map(([k, v]) => stringFromDeclaration(k, v as never))
					.join('')}}`,
		)
		.join('')
}
