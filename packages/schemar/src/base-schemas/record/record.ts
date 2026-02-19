// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type {
	$$Schema,
	$$Schemable,
	CustomRecord,
	CustomRecord$,
	Input,
	Output,
	RecordOptions,
} from '~'

import { RecordImpl } from './RecordImpl'

interface Record_<
	TKeySchema extends $$Schema & {
		Output: keyof any
		Input: keyof any | undefined
	},
	TValueSchema extends $$Schemable,
> extends CustomRecord<{
	Output: Record<Output<TKeySchema>, Output<TValueSchema>>

	Input: Record<Exclude<Input<TKeySchema>, undefined>, Input<TValueSchema>>

	// keySchema: TKeySchema
	// valueSchema: TValueSchema
}> {}

export { Record_ as Record }

export interface Record$<
	TKeySchema extends $$Schema & {
		Output: keyof any
		Input: keyof any | undefined
	},
	TValueSchema extends $$Schemable,
> extends CustomRecord$<{
	Output: Record<Output<TKeySchema>, Output<TValueSchema>>

	Input: Record<Exclude<Input<TKeySchema>, undefined>, Input<TValueSchema>>

	/** Hide for editor performance */
	// keySchema: TKeySchema
	// valueSchema: TValueSchema
}> {}

//

export interface RecordConstructor {
	new <
		TKeySchema extends $$Schema & {
			Output: keyof any
			Input: keyof any
		},
		TValueSchema extends $$Schemable,
	>(
		keySchema: TKeySchema,
		valueSchema: TValueSchema,
	): Record_<TKeySchema, TValueSchema>

	new <TValueSchema extends $$Schemable>(
		valueSchema: TValueSchema,
	): Record_<RecordOptions.Default['keySchema'], TValueSchema>

	new <
		TKeySchema extends $$Schema & {
			Output: keyof any
			Input: keyof any
		},
		TValueSchema extends $$Schemable,
	>(
		...args: [TKeySchema, TValueSchema] | [TValueSchema]
	): Record_<TKeySchema, TValueSchema>
}

//

// eslint-disable-next-line sonarjs/variable-name
const Record_ = lazyConstructor(
	() => RecordImpl,
) as unknown as RecordConstructor
