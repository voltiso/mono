// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Schemable, $$SchemableObject } from '@voltiso/schemar.types'

export type $$PartialDocOptions = {
	// tag?: DocTag // ! temporarily disable to clean up lib API

	id?: $$Schemable

	publicOnCreation?: $$SchemableObject
	public?: $$SchemableObject
	private?: $$SchemableObject

	aggregates?: Record<string, $$Schemable>
}
