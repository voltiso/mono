// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Direction } from './Direction'

export type GetOtherDirection<D extends Direction> = (typeof map)[D]

const map = {
	left: 'right',
	right: 'left',
	up: 'down',
	down: 'up',
} as const

export function getOtherDirection<D extends Direction>(
	edge: D,
): GetOtherDirection<D> {
	return map[edge]
}
