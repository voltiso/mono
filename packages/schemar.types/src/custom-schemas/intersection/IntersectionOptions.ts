// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Schemable } from '~/Schemable'
import type { DefaultSchemaOptions, SchemaOptions } from '~/SchemaOptions'

export interface IntersectionOptions extends SchemaOptions {
	schemas: $$Schemable[]
}

export interface DefaultIntersectionOptions extends DefaultSchemaOptions {
	schemas: $$Schemable[]
}
