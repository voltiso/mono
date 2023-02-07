// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// import { assert } from '@voltiso/util'
// import { useContext } from 'react'

import { FlushRscStyle } from '~/next/FlushRscStyle/FlushRscStyle'
import { isServerComponent } from '~/util'
// import { RscIdContext } from '~/server/RscIdContext'
// import { rscRenderers } from '~/server/rscRenderers'
// import { isServerComponent } from '~/util/isServerComponent'

export function maybeFlushRscStyle(
	// ctx: { renderer?: WebRenderer | NativeRenderer },
	reactNode: React.ReactNode,
) {
	// // eslint-disable-next-line react-hooks/rules-of-hooks
	// const rscId = useContext(RscIdContext)
	// assert(rscId)
	// const rscRenderer = rscRenderers.get(rscId)
	// assert(rscRenderer)

	// if (!isServerComponent || rscRenderer.isFlushed()) return reactNode

	if (!isServerComponent) return reactNode

	return [reactNode, <FlushRscStyle key='_' />]
}
