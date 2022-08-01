// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SCHEMA_NAME } from '_'

import type { ISchema } from '~'

export interface IUnknownLiteral extends ISchema {
	readonly [SCHEMA_NAME]: 'UnknownLiteral'

	// readonly [BASE_OPTIONS]: UnknownLiteralOptions
	// readonly [DEFAULT_OPTIONS]: DefaultUnknownLiteralOptions
}
