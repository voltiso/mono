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

	// if (process.env['NODE_ENV'] === 'development') {

	/** Need this for client-side routing - in production too */

	useInsertionEffect(() => {
		if (!rscStyle?.v) return

		/**
		 * `.getElementById()` is the most performant - better than
		 * `.querySelector()`
		 */
		// eslint-disable-next-line unicorn/prefer-query-selector
		if (document.getElementById(rscStyle.k)) return

		// console.log('voltiso-rsc', rscStyle)
		const node = document.createElement('style')

		// eslint-disable-next-line unicorn/prefer-dom-node-dataset
		node.setAttribute('data-voltiso-rsc', '')
		node.id = rscStyle.k
		node.textContent = rscStyle.v

		document.head.append(node)
	})
	// }

	useServerInsertedHTML(() => {
		if (!rscStyle?.v) return null

		return (
			<style data-voltiso-rsc-ssr='' id={rscStyle.k} key={rscStyle.k}>
				{rscStyle.v}
			</style>
		)
	})

	return null
}
