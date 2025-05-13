// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SCHEMA_NAME } from '_'
import type { BASE_OPTIONS, DEFAULT_OPTIONS, OPTIONS } from '@voltiso/util'

import type { CustomSchema, CustomSchema$ } from '~'

import type { RecordOptions } from './RecordOptions'

export interface CustomRecord<O extends Partial<RecordOptions>>
	extends CustomSchema<O> {
	readonly [SCHEMA_NAME]: 'Record'

	readonly [BASE_OPTIONS]: RecordOptions
	readonly [DEFAULT_OPTIONS]: RecordOptions.Default

	//

	get getKeySchema(): this[OPTIONS]['keySchema']
	get getValueSchema(): this[OPTIONS]['valueSchema']

	//

	get getIndexSignatures(): _RecordIndexSignatures<this>
	get getShape(): {}
}

//

export interface CustomRecord$<O extends Partial<RecordOptions>>
	extends CustomSchema$<O> {
	readonly [SCHEMA_NAME]: 'Record'

	readonly [BASE_OPTIONS]: RecordOptions
	readonly [DEFAULT_OPTIONS]: RecordOptions.Default

	//

	get getKeySchema(): this[OPTIONS]['keySchema']
	get getValueSchema(): this[OPTIONS]['valueSchema']

	//

	get getIndexSignatures(): _RecordIndexSignatures<this>
	get getShape(): {}
}

//

export type _RecordIndexSignatures<
	This extends { [OPTIONS]: { keySchema: any; valueSchema: any } },
> = [
	{
		keySchema: This[OPTIONS]['keySchema']
		valueSchema: This[OPTIONS]['valueSchema']
	},
]
