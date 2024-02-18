// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'

import type { IFunction } from './IFunction'

export function isFunctionSchema(x: unknown): x is IFunction {
	return (x as IFunction | null)?.[SCHEMA_NAME] === 'Function'
}
