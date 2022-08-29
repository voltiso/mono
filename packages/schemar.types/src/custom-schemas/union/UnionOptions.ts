// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SchemableLike } from '~/Schemable'
import type { DefaultSchemaOptions, SchemaOptions } from '~/SchemaOptions'

export interface UnionOptions extends SchemaOptions {
	schemas: SchemableLike[]
}

export interface DefaultUnionOptions extends DefaultSchemaOptions {
	schemas: SchemableLike[]
}
