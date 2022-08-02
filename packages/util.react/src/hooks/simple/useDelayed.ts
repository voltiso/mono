// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { useConst } from './useConst'
import { useUpdate } from './useUpdate'

export const useDelayed = (x: unknown, delay = 0) => {
	const update = useUpdate()
	const s = useConst({ curr: x, next: x })

	if (x !== s.next) {
		s.next = x
		setTimeout(() => {
			s.curr = x
			update()
		}, delay)
	}

	return s.curr
}
