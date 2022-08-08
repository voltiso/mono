// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { FC } from 'react'
import { useEffect, useLayoutEffect } from 'react'

import { useInitial } from '~/hooks'

export const Lifecycle: FC<{
	onLayoutFirstRender?: (() => void) | undefined
	onFirstRender?: (() => void) | undefined
}> = ({ onLayoutFirstRender, onFirstRender }) => {
	const mutable = useInitial({
		layoutFirstRenderCalled: false,
		firstRenderCalled: false,
	})

	useLayoutEffect(() => {
		if (onLayoutFirstRender && !mutable.layoutFirstRenderCalled) {
			mutable.layoutFirstRenderCalled = true
			onLayoutFirstRender()
		}
	}, [mutable, onLayoutFirstRender])

	useEffect(() => {
		if (onFirstRender && !mutable.firstRenderCalled) {
			mutable.firstRenderCalled = true
			onFirstRender()
		}
	}, [mutable, onFirstRender])

	return null
}
