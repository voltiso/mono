// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Union } from '../s/union'
import type { IRootSchema } from './IRootSchema.js'
import type { ISchema } from './ISchema.js'
import type { SchemaOptions } from './SchemaOptions.js'

export interface CustomSchema<O extends SchemaOptions> extends ISchema<O> {
	or<Other extends IRootSchema>(other: Other): Or<this, Other>
}

type Or<
	This extends ISchema,
	Other extends IRootSchema,
> = This extends IRootSchema ? Union<[This, Other]> : never
