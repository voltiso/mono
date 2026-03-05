// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { useEffect, useState } from 'react'

export function useIsPageLoaded(): boolean {
	if (typeof document === 'undefined') return false // ssr

	// biome-ignore lint/correctness/useHookAtTopLevel: .
	const [isPageLoaded, setIsPageLoaded] = useState(
		false, // consistent with server
		// () => document.readyState === 'complete',
	)

	// biome-ignore lint/correctness/useHookAtTopLevel: .
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
