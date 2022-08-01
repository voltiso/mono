// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'

import type { IBoolean } from '~'

export function isBoolean(x: unknown): x is IBoolean {
	// eslint-disable-next-line security/detect-object-injection
	return (x as IBoolean | null)?.[SCHEMA_NAME] === 'Boolean'
}
