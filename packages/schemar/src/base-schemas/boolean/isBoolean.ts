// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'

import type { IBoolean } from './IBoolean'

export function isBooleanSchema(x: unknown): x is IBoolean {
	return (x as IBoolean | null)?.[SCHEMA_NAME] === 'Boolean'
}
