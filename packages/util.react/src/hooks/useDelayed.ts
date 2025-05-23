// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { useInitial } from './useInitial'
import { useUpdate } from './useUpdate'

export function useDelayed(x: unknown, delay = 0): unknown {
	const update = useUpdate()
	const s = useInitial({ curr: x, next: x })

	if (x !== s.next) {
		s.next = x
		setTimeout(() => {
			s.curr = x
			update()
		}, delay)
	}

	return s.curr
}
