// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { undef } from '@voltiso/util'
import { useCallback, useMemo, useState } from 'react'

import { LocalStorage } from '../LocalStorage'

export function useLocalStorage<T>(key: string, def?: T) {
	const storage = useMemo(() => new LocalStorage(key, def), [key, def])

	const [x, setX] = useState(() => storage.data)

	const set = useCallback(
		(x?: T) => {
			if (x === undef) storage.clear()
			else {
				storage.data = x
				setX(x)
			}
		},
		[storage],
	)

	return [x, set] as const
}
