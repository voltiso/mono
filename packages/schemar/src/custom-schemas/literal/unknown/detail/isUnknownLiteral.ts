// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'

import type { IUnknownLiteral } from './IUnknownLiteral'

export function isUnknownLiteral(x: unknown): x is IUnknownLiteral {
	// eslint-disable-next-line security/detect-object-injection
	return (x as IUnknownLiteral | null)?.[SCHEMA_NAME] === 'UnknownLiteral'
}
