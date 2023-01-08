// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Schemable, DefaultSchemaOptions, SchemaOptions } from '~'

export interface IntersectionOptions extends SchemaOptions {
	schemas: $$Schemable[]
}

export interface DefaultIntersectionOptions extends DefaultSchemaOptions {
	schemas: $$Schemable[]
}
