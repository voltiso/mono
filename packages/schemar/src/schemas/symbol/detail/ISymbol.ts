// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ISchema } from '~'
import { SCHEMA_NAME } from '~'

export interface ISymbol extends ISchema {
	readonly [SCHEMA_NAME]: 'Symbol'

	// readonly [BASE_OPTIONS]: SymbolOptions
	// readonly [DEFAULT_OPTIONS]: DefaultSymbolOptions
}

export function isSymbol(x: unknown): x is ISymbol {
	// eslint-disable-next-line security/detect-object-injection
	return Boolean((x as ISymbol | null)?.[SCHEMA_NAME] === 'Symbol')
}
