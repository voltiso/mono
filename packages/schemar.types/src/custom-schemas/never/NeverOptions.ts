// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DefaultSchemaOptions, SchemaOptions } from '~/SchemaOptions'

export interface NeverOptions extends SchemaOptions {
	Output: never
	Input: never
}

export interface DefaultNeverOptions extends DefaultSchemaOptions {
	Output: never
	Input: never
}
