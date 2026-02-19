// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CustomSchema, SchemaOptions } from '~'

export interface CustomTypeOnly<
	O extends Partial<SchemaOptions>,
> extends CustomSchema<O> {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'TypeOnly'

	readonly [Voltiso.DEFAULT_OPTIONS]: SchemaOptions.Default // use global defaults
}
