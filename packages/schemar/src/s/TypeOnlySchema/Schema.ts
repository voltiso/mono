// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CustomSchema, DefaultSchemaOptions } from '../../schema'

export type Schema<T = unknown> = CustomSchema<
	DefaultSchemaOptions & { _in: T; _out: T }
>
