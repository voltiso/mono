// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isDefined } from '@voltiso/util'
import { useCallback, useMemo } from 'react'

import { useInitial, useUpdate } from '~/hooks'
import { LocalStorage } from '~/LocalStorage'

//

export function useLocalStorage<T>(
	key: string,
	def?: T,
): readonly [T, (x?: T) => void]

export function useLocalStorage<T>(
	key: undefined,
	def?: T,
): readonly [undefined, (x?: T) => void]

export function useLocalStorage<T, Key extends string | undefined>(
	key: Key,
	def?: T,
): readonly [
	Key extends undefined ? undefined : Key extends string ? T : never,
	(x?: T) => void,
]

export function useLocalStorage<T>(
	key: string | undefined,
	def?: T,
): readonly [T | undefined, (x?: T) => void]

//

export function useLocalStorage<T>(
	key: string | undefined,
	def?: T,
): readonly [T | undefined, (x?: T) => void] {
	const update = useUpdate()
	const mutable = useInitial({ data: undefined as T | undefined })

	// const current = useCurrent({ x, key, def })

	const storage = useMemo(() => {
		const storage = isDefined(key) ? new LocalStorage(key, def) : undefined
		mutable.data = storage?.data
		return storage
	}, [def, key, mutable])

	const set = useCallback(
		(x?: T) => {
			if (!storage) return

			// throw new Error(
			// 	// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			// 	`useLocalStorage: cannot set value ${current.x} for local storage key ${current.key}`,
			// )

			if (x === undefined) storage.clear()
			else {
				storage.data = x
				mutable.data = x
				update()
			}
		},
		[mutable, storage, update],
	)

	return [mutable.data, set] as const
}
