// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Schemable, SchemableObjectLike } from '@voltiso/schemar.types'

export type NewFieldsLike = {
	id?: $$Schemable

	publicOnCreation?: SchemableObjectLike
	public?: SchemableObjectLike
	private?: SchemableObjectLike

	aggregates?: Record<string, $$Schemable>
}
