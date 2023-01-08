// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DefaultSchemaOptions, SchemaOptions } from '~/Schema/options'

export interface VoidOptions extends SchemaOptions {
	Output: void
	Input: void
}

export interface DefaultVoidOptions extends DefaultSchemaOptions {
	Output: void
	Input: void
}
