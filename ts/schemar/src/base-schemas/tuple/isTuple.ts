// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'

import type { ITuple, ITuple$ } from '~'

export function isTupleSchema(x: unknown): x is ITuple$ {
	return (x as ITuple | null)?.[SCHEMA_NAME] === 'Tuple'
}
