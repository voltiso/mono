// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Edge } from './Edge'

export type GetOtherEdge<E extends Edge> = typeof map[E]

const map = {
	left: 'right',
	right: 'left',
	top: 'bottom',
	bottom: 'top',
} as const

export function getOtherEdge<E extends Edge>(edge: E): GetOtherEdge<E> {
	// eslint-disable-next-line security/detect-object-injection
	return map[edge] as never
}
