// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// // eslint-disable-next-line import/no-unassigned-import
// import 'server-only'

import type { FC } from 'react'
import { useMemo } from 'react'

import { ClientFlushRscStyle } from '~/client/ClientFlushRscStyle'
import { getHash } from '~/renderer/_/getHash'
import { rscRenderer } from '~/server/rscRenderer'

// import { RscIdContext } from '~/server/RscIdContext'
// import { rscRenderers } from '~/server/rscRenderers'
import type { RscStyle } from './RscStyle'
// import { RscStyleContext } from './RscStyle'

export const FlushRscStyle: FC = () => {
	// // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	// if (!RscIdContext) return null

	// const rscId = useContext(RscIdContext)
	// assert(rscId)

	// const rscRenderer = rscRenderers.get(rscId)
	// assert(rscRenderer)

	const rscStyleValue = rscRenderer.flushStyle()

	const rscStyle = useMemo<RscStyle>(() => {
		const hash = getHash(rscStyleValue)

		return {
			k: hash,
			// k: rscRenderer.numFlushes,
			v: rscStyleValue,
		}
	}, [rscStyleValue])

	// console.log('FlushRscStyle', rscStyle)

	return (
		// <RscStyleContext.Provider value={rscStyle}>
		<ClientFlushRscStyle rscStyle={rscStyle} />
		// </RscStyleContext.Provider>
	)
}
