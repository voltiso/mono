// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { useEffect } from 'react'

import { useCurrent } from '~/hooks'

export function useDelayedEffect(
	milliseconds: number,
	// eslint-disable-next-line promise/prefer-await-to-callbacks
	callback: () => void,
): void {
	const current = useCurrent({ callback })

	useEffect(() => {
		const timeout = setTimeout(() => {
			current.callback()
		}, milliseconds)

		return () => {
			clearTimeout(timeout)
		}
		// eslint-disable-next-line react-hooks/rule-suppression
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
}
