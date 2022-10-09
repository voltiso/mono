// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IDoc } from '~/Doc'

import type { DocRefBaseImpl } from './DocRefBaseImpl'
import type { StrongDocRef } from './StrongDocRef'
import type { WeakDocRef } from './WeakDocRef'

export function isDocRef(
	x: unknown,
): x is StrongDocRef<IDoc> | WeakDocRef<IDoc> {
	return (
		typeof x === 'object' &&
		typeof (x as DocRefBaseImpl | null)?._isStrong === 'boolean'
	)
}
