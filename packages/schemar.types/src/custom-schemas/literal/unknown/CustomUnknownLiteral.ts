// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS, SCHEMA_NAME } from '_'

import type { CustomSchema } from '~/Schema'

import type { $$UnknownLiteral } from '.'
import type {
	DefaultUnknownLiteralOptions,
	UnknownLiteralOptions,
} from './UnknownLiteralOptions'

export interface CustomUnknownLiteral<O extends Partial<UnknownLiteralOptions>>
	extends $$UnknownLiteral,
		CustomSchema<O> {
	//
	[SCHEMA_NAME]: 'UnknownLiteral'

	readonly [BASE_OPTIONS]: UnknownLiteralOptions
	readonly [DEFAULT_OPTIONS]: DefaultUnknownLiteralOptions
}
