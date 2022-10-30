// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Schemable, $$SchemableObject } from '@voltiso/schemar.types'

import type { DocTag } from '~/DocTypes'

export type $$PartialDocOptions = {
	tag?: DocTag

	id?: $$Schemable

	publicOnCreation?: $$SchemableObject
	public?: $$SchemableObject
	private?: $$SchemableObject

	aggregates?: Record<string, $$Schemable>
}
