// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	BASE_OPTIONS,
	CustomSchema,
	DEFAULT_OPTIONS,
	DefaultUnknownLiteralOptions,
	SCHEMA_NAME,
	UnknownLiteralOptions,
} from '~'

export interface CustomUnknownLiteral<O extends Partial<UnknownLiteralOptions>>
	extends CustomSchema<O> {
	[SCHEMA_NAME]: 'UnknownLiteral'

	[BASE_OPTIONS]: UnknownLiteralOptions
	[DEFAULT_OPTIONS]: DefaultUnknownLiteralOptions
}
