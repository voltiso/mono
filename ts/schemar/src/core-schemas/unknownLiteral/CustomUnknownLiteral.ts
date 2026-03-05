// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $fastAssert } from '@voltiso/util'
import { SCHEMA_NAME } from '_'

import type { $$UnknownLiteral, CustomSchema, CustomSchema$ } from '~'

import type { UnknownLiteralOptions } from './UnknownLiteralOptions'

$fastAssert(SCHEMA_NAME)

//

export interface CustomUnknownLiteral<O extends Partial<UnknownLiteralOptions>>
	extends $$UnknownLiteral,
		CustomSchema<O> {
	//
	[SCHEMA_NAME]: 'UnknownLiteral'

	readonly [Voltiso.BASE_OPTIONS]: UnknownLiteralOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: UnknownLiteralOptions.Default
}

//

export interface CustomUnknownLiteral$<O extends Partial<UnknownLiteralOptions>>
	extends $$UnknownLiteral,
		CustomSchema$<O> {
	//
	[SCHEMA_NAME]: 'UnknownLiteral'

	readonly [Voltiso.BASE_OPTIONS]: UnknownLiteralOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: UnknownLiteralOptions.Default
}
