// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'
import type { OPTIONS } from '@voltiso/util'

import type { RecordOptions, Schema, Schema$ } from '~'

export interface $$Record {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Record'
}

export interface IRecord extends Schema {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Record'
	[OPTIONS]: RecordOptions
}

export interface IRecord$ extends Schema$ {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Record'
	[OPTIONS]: RecordOptions
}

export function isRecordSchema(x: unknown): x is IRecord$ {
	return (x as IRecord | null)?.[SCHEMA_NAME] === 'Record'
}

export function is$$RecordSchema(x: unknown): x is $$Record {
	return isRecordSchema(x)
}
