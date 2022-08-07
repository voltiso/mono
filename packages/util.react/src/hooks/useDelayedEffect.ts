import { useEffect } from 'react'
import { useCurrent } from '~/hooks'

export function useDelayedEffect(milliseconds: number, callback: () => void) {
	const current = useCurrent({ callback })

	useEffect(() => {
		const timeout = setTimeout(() => current.callback(), milliseconds)
		return () => {
			clearTimeout(timeout)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
}
