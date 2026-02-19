// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Unit } from '~/_/StyledData/IStyledData'
import type { Keyframes } from '~/Css'

import { stringFromDeclaration } from './stringFromDeclaration'

export function stringFromKeyframes(
	options: { unit: Unit },
	keyframes: Keyframes,
): string {
	return Object.entries(keyframes)
		.map(
			([k, v]) =>
				`${k}{${Object.entries(v as never)
					.map(([k, v]) => stringFromDeclaration(k, v as never, options))
					.join('')}}`,
		)
		.join('')
}
