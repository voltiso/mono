// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SCHEMA_NAME } from '_'
import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'

import type { CustomSchema } from '~/Schema'

import type {
	DefaultUnknownRecordOptions,
	UnknownRecordOptions,
} from './UnknownRecordOptions'

export interface CustomUnknownRecord<O extends Partial<UnknownRecordOptions>>
	extends CustomSchema<O> {
	readonly [SCHEMA_NAME]: 'UnknownRecord'

	readonly [BASE_OPTIONS]: UnknownRecordOptions
	readonly [DEFAULT_OPTIONS]: DefaultUnknownRecordOptions

	get getIndexSignatures(): []
	get getShape(): {}
}
