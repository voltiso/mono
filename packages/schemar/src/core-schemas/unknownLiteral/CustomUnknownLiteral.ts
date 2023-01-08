// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'
import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'
import { $assert } from '@voltiso/util'

import type { $$UnknownLiteral, CustomSchema } from '~'

import type {
	DefaultUnknownLiteralOptions,
	UnknownLiteralOptions,
} from './UnknownLiteralOptions'

$assert(SCHEMA_NAME)

export interface CustomUnknownLiteral<O extends Partial<UnknownLiteralOptions>>
	extends $$UnknownLiteral,
		CustomSchema<O> {
	//
	[SCHEMA_NAME]: 'UnknownLiteral'

	readonly [BASE_OPTIONS]: UnknownLiteralOptions
	readonly [DEFAULT_OPTIONS]: DefaultUnknownLiteralOptions
}
