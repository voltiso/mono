// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Record_ } from '@voltiso/util'

import type { Input, Output } from '~'
import type { $$Schema } from '~/Schema'
import type { $$Schemable } from '~/Schemable'

import type { CustomRecord } from './CustomRecord'
import type { DefaultRecordOptions } from './RecordOptions'

//

export type { SRecord as Record }
type SRecord<
	TKeySchema extends $$Schema & {
		Output: keyof any
		Input: keyof any | undefined
	},
	TValueSchema extends $$Schemable,
> = CustomRecord<{
	Output: Record_<Output<TKeySchema>, Output<TValueSchema>>

	Input: Record_<Exclude<Input<TKeySchema>, undefined>, Input<TValueSchema>>

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
	): SRecord<TKeySchema, TValueSchema>

	new <TValueSchema extends $$Schemable>(valueSchema: TValueSchema): SRecord<
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
	): SRecord<TKeySchema, TValueSchema>
}
