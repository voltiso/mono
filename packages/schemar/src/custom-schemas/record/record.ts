// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type {
	DefaultRecordOptions,
	InputType,
	OutputType,
	SchemableLike,
} from '~'

import type { CustomRecord } from './CustomRecord'
import { RecordImpl } from './RecordImpl'

type Record_<
	TKeySchema extends { OutputType: keyof any; InputType: keyof any },
	TValueSchema extends SchemableLike,
> = CustomRecord<{
	Output: Record<OutputType<TKeySchema>, OutputType<TValueSchema>>
	Input: Record<InputType<TKeySchema>, InputType<TValueSchema>>

	keySchema: TKeySchema
	valueSchema: TValueSchema
}>

const Record_ = lazyConstructor(
	() => RecordImpl,
) as unknown as RecordConstructor

export { Record_ as Record }

//

export type RecordConstructor = {
	new <
		TKeySchema extends { OutputType: keyof any; InputType: keyof any },
		TValueSchema extends SchemableLike,
	>(
		keySchema: TKeySchema,
		valueSchema: TValueSchema,
	): Record_<TKeySchema, TValueSchema>

	new <TValueSchema extends SchemableLike>(valueSchema: TValueSchema): Record_<
		DefaultRecordOptions['keySchema'],
		TValueSchema
	>

	new <
		TKeySchema extends { OutputType: keyof any; InputType: keyof any },
		TValueSchema extends SchemableLike,
	>(
		...args: [TKeySchema, TValueSchema] | [TValueSchema]
	): Record_<TKeySchema, TValueSchema>
}
