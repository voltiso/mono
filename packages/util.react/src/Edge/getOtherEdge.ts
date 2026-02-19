// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Edge } from './Edge'

export type GetOtherEdge<E extends Edge> = (typeof map)[E]

const map = {
	left: 'right',
	right: 'left',
	top: 'bottom',
	bottom: 'top',
} as const

export function getOtherEdge<E extends Edge>(edge: E): GetOtherEdge<E> {
	return map[edge] as never
}
