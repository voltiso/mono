// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Schema, $$Schemable, ISchema, SchemaOptions } from '~'

export interface RecordOptions extends SchemaOptions {
	// Output: Record<keyof any, unknown>
	// Input: Record<keyof any, unknown>

	keySchema: $$Schema & { Output: keyof any; Input: keyof any | undefined }
	valueSchema: $$Schemable
}

export declare namespace RecordOptions {
	export interface Default extends SchemaOptions.Default {
		Output: Record<keyof any, unknown>
		Input: Record<keyof any, unknown>

		keySchema: ISchema<keyof any>
		valueSchema: ISchema<unknown>
	}
}
