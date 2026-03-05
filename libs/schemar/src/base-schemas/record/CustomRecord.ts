// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { OPTIONS } from '@voltiso/util'

import type { CustomSchema, CustomSchema$ } from '~'

import type { RecordOptions } from './RecordOptions'

export interface CustomRecord<O extends Partial<RecordOptions>>
	extends CustomSchema<O> {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Record'

	readonly [Voltiso.BASE_OPTIONS]: RecordOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: RecordOptions.Default

	//

	get getKeySchema(): this[Voltiso.OPTIONS]['keySchema']
	get getValueSchema(): this[Voltiso.OPTIONS]['valueSchema']

	//

	get getIndexSignatures(): _RecordIndexSignatures<this>
	get getShape(): {}
}

//

export interface CustomRecord$<O extends Partial<RecordOptions>>
	extends CustomSchema$<O> {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Record'

	readonly [Voltiso.BASE_OPTIONS]: RecordOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: RecordOptions.Default

	//

	get getKeySchema(): this[Voltiso.OPTIONS]['keySchema']
	get getValueSchema(): this[Voltiso.OPTIONS]['valueSchema']

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
