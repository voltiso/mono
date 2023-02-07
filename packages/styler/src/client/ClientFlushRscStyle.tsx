// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

'use client'

import { useServerInsertedHTML } from 'next/navigation'
import type { FC } from 'react'
import { useContext, useInsertionEffect } from 'react'

import { RscStyleContext } from '../nextJs/FlushRscStyle/serverContext'

export const ClientFlushRscStyle: FC = () => {
	const rscStyle = useContext(RscStyleContext)

	// // const update = useUpdate()
	// const [x, setX] = useState(0)
	// const update = useCallback(() => setX(x => x + 1), [setX])
	// useEffect(() => {
	// 	const observer = new PerformanceObserver(update)

	// 	observer.observe({
	// 		entryTypes: ['resource'],
	// 	})

	// 	return () => {
	// 		observer.disconnect()
	// 	}
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [])

	// eslint-disable-next-line n/no-process-env
	if (process.env['NODE_ENV'] === 'development') {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		useInsertionEffect(() => {
			if (!rscStyle) return
			// console.log('voltiso-rsc-dev', rscStyle)
			const node = document.createElement('style')
			// eslint-disable-next-line unicorn/prefer-dom-node-dataset
			node.setAttribute('data-voltiso-rsc-dev', '')
			node.textContent = rscStyle.v
			document.head.append(node)
		})
	}

	useServerInsertedHTML(() => {
		if (!rscStyle) return null

		// console.log('voltiso-rsc', rscStyle)
		return (
			<style
				data-voltiso-rsc=''
				key={rscStyle.k}
			>
				{rscStyle.v}
			</style>
		)
	})

	return null
}
