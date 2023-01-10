// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'
import type { OPTIONS } from '@voltiso/util'

import type { ISchema, RecordOptions } from '~'

export interface IRecord extends ISchema {
	readonly [SCHEMA_NAME]: 'Record'

	[OPTIONS]: RecordOptions
}

export function isRecordSchema(x: unknown): x is IRecord {
	// eslint-disable-next-line security/detect-object-injection
	return (x as IRecord | null)?.[SCHEMA_NAME] === 'Record'
}