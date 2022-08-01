// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'

import type { ILiteral } from './ILiteral'

export function isLiteral(x: unknown): x is ILiteral {
	// eslint-disable-next-line security/detect-object-injection
	return (x as ILiteral | null)?.[SCHEMA_NAME] === 'Literal'
}
