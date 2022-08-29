// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DefaultSchemaOptions, SchemaOptions } from '~'

export interface UnknownRecordOptions extends SchemaOptions {
	Output: Record<keyof any, unknown>
	Input: Record<keyof any, unknown>
}

export interface DefaultUnknownRecordOptions extends DefaultSchemaOptions {
	Output: Record<keyof any, unknown>
	Input: Record<keyof any, unknown>
}
