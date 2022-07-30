// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ITuple } from '~'
import { SCHEMA_NAME } from '~'

export function isTuple(x: unknown): x is ITuple {
	// eslint-disable-next-line security/detect-object-injection
	return (x as ITuple | null)?.[SCHEMA_NAME] === 'Tuple'
}
