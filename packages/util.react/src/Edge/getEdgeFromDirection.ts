// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Direction } from '~/Direction'

export type GetEdgeFromDirection<D extends Direction> = (typeof map)[D]

const map = {
	left: 'left',
	right: 'right',
	up: 'top',
	down: 'bottom',
} as const

export function getEdgeFromDirection<D extends Direction>(
	direction: D,
): GetEdgeFromDirection<D> {
	return map[direction]
}
