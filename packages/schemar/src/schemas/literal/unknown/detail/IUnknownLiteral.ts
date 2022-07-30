// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ISchema } from '~'
import { SCHEMA_NAME } from '~'

export interface IUnknownLiteral extends ISchema {
	readonly [SCHEMA_NAME]: 'UnknownLiteral'

	// readonly [BASE_OPTIONS]: UnknownLiteralOptions
	// readonly [DEFAULT_OPTIONS]: DefaultUnknownLiteralOptions
}

export function isUnknownLiteral(x: unknown): x is IUnknownLiteral {
	// eslint-disable-next-line security/detect-object-injection
	return (x as IUnknownLiteral | null)?.[SCHEMA_NAME] === 'UnknownLiteral'
}
