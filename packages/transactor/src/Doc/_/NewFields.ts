// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ObjectLike, Schemable } from '@voltiso/schemar.types'

export type NewFields = {
	id?: Schemable

	publicOnCreation?: Record<string, Schemable> | ObjectLike
	public?: Record<string, Schemable> | ObjectLike
	private?: Record<string, Schemable> | ObjectLike

	aggregates?: Record<string, Schemable>
}
