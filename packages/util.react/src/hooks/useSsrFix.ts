// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { useLayoutEffect, useMemo } from 'react'

import { useInitial, useUpdate } from '~/hooks'

export function useSsrFix() {
	const mutable = useInitial({ isFirstRender: true })
	const update = useUpdate()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useLayoutEffect(update, [])

	const result = useMemo(
		() => ({ isFirstRender: mutable.isFirstRender }),
		[mutable.isFirstRender],
	)

	mutable.isFirstRender = false

	return result
}
