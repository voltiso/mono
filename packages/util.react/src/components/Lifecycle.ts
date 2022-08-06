// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { FC } from 'react'
import { useEffect } from 'react'

import { useInitial } from '~/hooks'

export const Lifecycle: FC<{
	onFirstRender?: (() => void) | undefined
}> = ({ onFirstRender }) => {
	const mutable = useInitial({ firstRenderCallbackCalled: false })

	useEffect(() => {
		if (onFirstRender && !mutable.firstRenderCallbackCalled) {
			mutable.firstRenderCallbackCalled = true
			onFirstRender()
		}
	}, [mutable, onFirstRender])

	return null
}
