// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Schemable, DefaultSchemaOptions } from '~'
import type { SchemaOptions } from '~/Schema/options'

export interface UnionOptions extends SchemaOptions {
	schemas: $$Schemable[]
}

export interface DefaultUnionOptions extends DefaultSchemaOptions {
	schemas: $$Schemable[]
}
