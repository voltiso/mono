// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ISchema } from './ISchema.js'
import type { SchemaOptions } from './SchemaOptions.js'

export type IRootSchema = ISchema<
	SchemaOptions & { isOptional: false; isReadonly: false; hasDefault: false }
>
