// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isDefined, undef } from '@voltiso/util'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { useCurrent } from '~/hooks'
import { LocalStorage } from '~/LocalStorage'

export function useLocalStorage<T>(
	key: string,
	def?: T,
): readonly [T, (x?: T) => void]

export function useLocalStorage<T>(
	key: undefined,
	def?: T,
): readonly [undefined, (x?: T) => void]

export function useLocalStorage<T>(
	key: string | undefined,
	def?: T,
): readonly [T | undefined, (x?: T) => void]

export function useLocalStorage<T>(
	key: string | undefined,
	def?: T,
): readonly [T | undefined, (x?: T) => void] {
	const [x, setX] = useState<T>()

	const current = useCurrent({ x, key, def })

	const storage = useMemo(() => {
		if (isDefined(key)) return new LocalStorage(key, def)
		else return undef
	}, [def, key])

	useEffect(() => {
		setX(storage?.data)
	}, [storage?.data])

	const set = useCallback(
		(x?: T) => {
			if (!storage)
				throw new Error(
					// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
					`useLocalStorage: cannot set value ${current.x} for local storage key ${current.key}`,
				)

			if (x === undef) storage.clear()
			else {
				storage.data = x
				setX(x)
			}
		},
		[storage, current], // TODO: implement eslint rule to not depend on current.*
	)

	return [x, set] as const
}
