// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { useEffect } from 'react'

import { useCurrent } from '~/hooks'

export function useDelayedEffect(
	milliseconds: number,

	callback: () => void,
): void {
	const current = useCurrent({ callback })

	// biome-ignore lint/correctness/useExhaustiveDependencies: .
	useEffect(() => {
		const timeout = setTimeout(() => {
			current.callback()
		}, milliseconds)

		return () => {
			clearTimeout(timeout)
		}
	}, [])
}
