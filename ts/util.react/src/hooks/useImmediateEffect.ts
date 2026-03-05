// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DependencyList } from 'react'
import { useMemo } from 'react'

import type { Destructor } from './_/Destructor'
import { useInitial } from './useInitial'
import { useOnUnmount } from './useOnUnmount'

/** Run the effect callback synchronously if the deps changed */
export function useImmediateEffect(
	effect: (info: { isFirstRender: boolean }) => void | Destructor,
	deps?: DependencyList,
): void {
	const mutable = useInitial({
		destructor: undefined as void | undefined | Destructor,
		isFirstRender: true,
	})

	const cleanup = () => {
		if (!mutable.destructor) return

		try {
			mutable.destructor()
		} finally {
			mutable.destructor = undefined
		}
	}

	useMemo(() => {
		cleanup()
		mutable.destructor = effect({ isFirstRender: mutable.isFirstRender })
		mutable.isFirstRender = false

		// biome-ignore lint/style/noNonNullAssertion: .
		// biome-ignore lint/correctness/useExhaustiveDependencies: .
	}, deps!)

	useOnUnmount(cleanup)
}
