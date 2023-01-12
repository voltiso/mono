// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Schemable, ISchema, SchemaOptions } from '~'

export interface RecordOptions extends SchemaOptions {
	Output: Record<keyof any, unknown>
	Input: Record<keyof any, unknown>

	keySchema: { Output: keyof any; Input: keyof any | undefined }
	valueSchema: $$Schemable
}

export interface DefaultRecordOptions extends SchemaOptions.Default {
	Output: Record<keyof any, unknown>
	Input: Record<keyof any, unknown>

	keySchema: ISchema<keyof any>
	valueSchema: ISchema<unknown>
}
