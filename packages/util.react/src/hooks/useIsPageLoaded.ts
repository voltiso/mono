// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { useEffect, useState } from 'react'

export function useIsPageLoaded() {
	if (typeof document === 'undefined') return false // ssr

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [isPageLoaded, setIsPageLoaded] = useState(
		false, // consistent with server
		// () => document.readyState === 'complete',
	)

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		if (isPageLoaded) return undefined

		if (document.readyState === 'complete') {
			setIsPageLoaded(true)
			return undefined
		}

		const callback = () => {
			setIsPageLoaded(true)
		}

		window.addEventListener('load', callback)

		return () => {
			window.removeEventListener('load', callback)
		}
	}, [isPageLoaded])

	return isPageLoaded
}
