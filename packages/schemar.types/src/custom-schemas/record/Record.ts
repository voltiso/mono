// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Record_ } from '@voltiso/util'

import type { InputType, OutputType } from '~'
import type { $$Schema } from '~/Schema'
import type { $$Schemable } from '~/Schemable'

import type { CustomRecord } from './CustomRecord'
import type { DefaultRecordOptions } from './RecordOptions'

//

export type { SRecord as Record }

type SRecord<
	TKeySchema extends $$Schema & {
		OutputType: keyof any
		InputType: keyof any | undefined
	},
	TValueSchema extends $$Schemable,
> = CustomRecord<{
	Output: Record_<OutputType<TKeySchema>, OutputType<TValueSchema>>
	Input: Record_<
		Exclude<InputType<TKeySchema>, undefined>,
		InputType<TValueSchema>
	>

	keySchema: TKeySchema
	valueSchema: TValueSchema
}>

//

export type RecordConstructor = {
	new <
		TKeySchema extends $$Schema & {
			OutputType: keyof any
			InputType: keyof any
		},
		TValueSchema extends $$Schemable,
	>(
		keySchema: TKeySchema,
		valueSchema: TValueSchema,
	): SRecord<TKeySchema, TValueSchema>

	new <TValueSchema extends $$Schemable>(valueSchema: TValueSchema): SRecord<
		DefaultRecordOptions['keySchema'],
		TValueSchema
	>

	new <
		TKeySchema extends $$Schema & {
			OutputType: keyof any
			InputType: keyof any
		},
		TValueSchema extends $$Schemable,
	>(
		...args: [TKeySchema, TValueSchema] | [TValueSchema]
	): SRecord<TKeySchema, TValueSchema>
}
