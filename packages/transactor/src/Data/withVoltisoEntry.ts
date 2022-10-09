// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IntrinsicFields } from '~/schemas'
import { sVoltisoEntry } from '~/schemas'

export function withVoltisoEntry<O extends { __voltiso?: unknown }>(
	data: O,
): O & IntrinsicFields {
	// if (sVoltisoEntry.isValid(data.__voltiso)) return data as never

	const __voltiso = sVoltisoEntry.validate(data.__voltiso)
	// console.log('????????', __voltiso)

	return { ...data, __voltiso }
}
