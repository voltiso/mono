// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { useMemo } from 'react'

import { useOnUnmount } from './useOnUnmount'

export type Destructor = () => void

/**
 * Similar to `useMemo()`, but allows specifying a cleanup function, similar to
 * how `useEffect()` works
 *
 * @example
 *
 * ```ts
 * const value = useMemoCleanup(addDestructor => {
 * 	const resource = createResource()
 *
 * 	addDestructor(() => {
 * 		resource.destroy()
 * 	})
 *
 * 	return resource.data
 * }, [])
 * ```
 */
export function useMemoCleanup<T>(
	factory: (addDestructor: (destructor: Destructor) => void) => T,
	deps: readonly unknown[],
): T {
	const destructors = useMemo(() => [] as Destructor[], [])

	const cleanup = () => {
		let firstError: unknown
		let haveError = false

		destructors.reverse()

		for (const destructor of destructors) {
			try {
				destructor()
			} catch (error) {
				if (haveError) {
					// eslint-disable-next-line no-console
					console.error(
						'useMemoCleanup(): Multiple errors in destructors. Next error ignored:',
						error,
					)
				} else {
					firstError = error
					haveError = true
				}
			}
		}

		destructors.length = 0

		if (haveError) {
			throw firstError
		}
	}

	const value = useMemo(() => {
		cleanup()

		return factory((destructor: Destructor) => {
			destructors.push(destructor)
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps)

	useOnUnmount(cleanup)

	return value
}
