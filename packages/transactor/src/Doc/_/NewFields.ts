// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SchemableLike, SchemableObjectLike } from '@voltiso/schemar.types'

export type NewFieldsLike = {
	id?: SchemableLike

	publicOnCreation?: SchemableObjectLike
	public?: SchemableObjectLike
	private?: SchemableObjectLike

	aggregates?: Record<string, SchemableLike>
}
