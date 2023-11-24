// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Schema, $$Schemable, Schema, SchemaOptions } from '~'

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

		keySchema: Schema<keyof any>
		valueSchema: Schema<unknown>
	}
}
