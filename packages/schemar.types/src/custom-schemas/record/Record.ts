import type { InputType, OutputType } from '~/GetType'
import type { SchemableLike } from '~/Schemable'
import type { CustomRecord } from './CustomRecord'
import type { DefaultRecordOptions } from './RecordOptions'

type Record_<
	TKeySchema extends {
		OutputType: keyof any
		InputType: keyof any | undefined
	},
	TValueSchema extends SchemableLike,
> = CustomRecord<{
	Output: Record<OutputType<TKeySchema>, OutputType<TValueSchema>>
	Input: Record<
		Exclude<InputType<TKeySchema>, undefined>,
		InputType<TValueSchema>
	>

	keySchema: TKeySchema
	valueSchema: TValueSchema
}>

export type { Record_ as Record }

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
