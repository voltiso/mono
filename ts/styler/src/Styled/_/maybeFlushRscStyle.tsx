// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// import { assert } from '@voltiso/util'
// import { useContext } from 'react'

import type * as React from 'react'

import { FlushRscStyle } from '~/nextJs/FlushRscStyle/FlushRscStyle'
import { isServerComponent } from '~/util'
// import { RscIdContext } from '~/server/RscIdContext'
// import { rscRenderers } from '~/server/rscRenderers'
// import { isServerComponent } from '~/util/isServerComponent'

export function maybeFlushRscStyle(
	// ctx: { renderer?: WebRenderer | NativeRenderer },
	reactNode: React.ReactNode,
): React.ReactNode {
	// const rscId = useContext(RscIdContext)
	// assert(rscId)
	// const rscRenderer = rscRenderers.get(rscId)
	// assert(rscRenderer)

	// if (!isServerComponent || rscRenderer.isFlushed()) return reactNode

	if (!isServerComponent) return reactNode

	// ! key??? TODO

	// biome-ignore lint/correctness/useJsxKeyInIterable: .
	return [reactNode, <FlushRscStyle />]
}
