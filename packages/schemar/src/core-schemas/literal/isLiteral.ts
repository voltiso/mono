// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'

import type { ILiteral } from './ILiteral'

export function isLiteralSchema(x: unknown): x is ILiteral {
	return (x as ILiteral | null)?.[SCHEMA_NAME] === 'Literal'
}
