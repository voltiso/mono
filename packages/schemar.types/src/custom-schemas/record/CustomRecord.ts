// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS, OPTIONS, SCHEMA_NAME } from '_'

import type { CustomSchema } from '~'

import type { DefaultRecordOptions, RecordOptions } from './RecordOptions'

export interface CustomRecord<O extends Partial<RecordOptions>>
	extends CustomSchema<O> {
	readonly [SCHEMA_NAME]: 'Record'

	readonly [BASE_OPTIONS]: RecordOptions
	readonly [DEFAULT_OPTIONS]: DefaultRecordOptions

	//

	// get OutputType(): Record<
	// 	OutputType<this[OPTIONS]['keySchema']>,
	// 	OutputType<this[OPTIONS]['valueSchema']>
	// >

	// get InputType(): Record<
	// 	InputType<this[OPTIONS]['keySchema']>,
	// 	InputType<this[OPTIONS]['valueSchema']>
	// >

	get getKeySchema(): this[OPTIONS]['keySchema']
	get getValueSchema(): this[OPTIONS]['valueSchema']

	//

	get getIndexSignatures(): _RecordIndexSignatures<this>
	get getShape(): {}

	//

	// index<TKeySchema extends SchemableLike, TValueSchema extends SchemableLike>(
	// 	keySchema: TKeySchema,
	// 	valueSchema: TValueSchema,
	// ): _GetIndex<this, TKeySchema, TValueSchema>

	// index<TValueSchema extends SchemableLike>(
	// 	valueSchema: TValueSchema,
	// ): _GetIndex<this, SimpleSchema<keyof any>, TValueSchema>
}

export type _RecordIndexSignatures<
	This extends { [OPTIONS]: { keySchema: any; valueSchema: any } },
> = [
	{
		keySchema: This[OPTIONS]['keySchema']
		valueSchema: This[OPTIONS]['valueSchema']
	},
]
