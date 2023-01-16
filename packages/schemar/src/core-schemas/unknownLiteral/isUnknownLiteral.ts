// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'

import type { IUnknownLiteral, IUnknownLiteral$ } from './IUnknownLiteral'

export function isUnknownLiteralSchema(x: unknown): x is IUnknownLiteral$ {
	return (x as IUnknownLiteral | null)?.[SCHEMA_NAME] === 'UnknownLiteral'
}
