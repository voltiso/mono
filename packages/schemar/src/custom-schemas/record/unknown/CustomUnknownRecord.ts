// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS, SCHEMA_NAME } from '_/symbols'

import type { CustomSchema } from '~/Schema/detail/CustomSchema'

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
