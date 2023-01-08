// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'

import type {
	CustomSchema,
	DefaultUnknownFunctionOptions,
	SCHEMA_NAME,
	UnknownFunctionOptions,
} from '~'

export interface CustomUnknownFunction<
	O extends Partial<UnknownFunctionOptions>,
> extends CustomSchema<O> {
	[SCHEMA_NAME]: 'UnknownFunction'

	readonly [BASE_OPTIONS]: UnknownFunctionOptions
	readonly [DEFAULT_OPTIONS]: DefaultUnknownFunctionOptions
}
