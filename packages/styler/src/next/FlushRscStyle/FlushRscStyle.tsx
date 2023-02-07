// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// // eslint-disable-next-line import/no-unassigned-import
// import 'server-only'

import type { FC } from 'react'

import { ClientFlushRscStyle } from '~/client/ClientFlushRscStyle'
import { rscRenderer } from '~/server/rscRenderer'

// import { RscIdContext } from '~/server/RscIdContext'
// import { rscRenderers } from '~/server/rscRenderers'
import { RscStyleContext } from './serverContext'

export const FlushRscStyle: FC = () => {
	// // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	// if (!RscIdContext) return null

	// const rscId = useContext(RscIdContext)
	// assert(rscId)

	// const rscRenderer = rscRenderers.get(rscId)
	// assert(rscRenderer)

	const rscStyle = rscRenderer.flushStyle()

	// console.log('FlushRscStyle', rscStyle)

	return (
		<RscStyleContext.Provider value={rscStyle}>
			<ClientFlushRscStyle />
		</RscStyleContext.Provider>
	)
}
