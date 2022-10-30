// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IDoc } from '~/Doc'

import type { StrongDocRef } from './StrongDocRef'
import type { UnknownDocRefBase } from './UnknownDocRefBase'
import type { WeakDocRef } from './WeakDocRef'

export function isDocRef(
	x: unknown,
): x is StrongDocRef<IDoc> | WeakDocRef<IDoc> {
	return (
		typeof x === 'object' &&
		typeof (x as UnknownDocRefBase<any, any, any> | null)?._isStrong ===
			'boolean'
	)
}
