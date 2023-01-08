// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type {
	$$Schema,
	$$Schemable,
	CustomRecord,
	DefaultRecordOptions,
	Input,
	Output,
} from '~'

import { RecordImpl } from './RecordImpl'

type Record_<
	TKeySchema extends $$Schema & {
		Output: keyof any
		Input: keyof any | undefined
	},
	TValueSchema extends $$Schemable,
> = CustomRecord<{
	Output: Record<Output<TKeySchema>, Output<TValueSchema>>

	Input: Record<Exclude<Input<TKeySchema>, undefined>, Input<TValueSchema>>

	keySchema: TKeySchema
	valueSchema: TValueSchema
}>

//

export type RecordConstructor = {
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

	new <TValueSchema extends $$Schemable>(valueSchema: TValueSchema): Record_<
		DefaultRecordOptions['keySchema'],
		TValueSchema
	>

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

const Record_ = lazyConstructor(
	() => RecordImpl,
) as unknown as RecordConstructor

export { Record_ as Record }
