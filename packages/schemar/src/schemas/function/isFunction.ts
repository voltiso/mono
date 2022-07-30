// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IFunction } from '~'
import { SCHEMA_NAME } from '~'

export function isFunction(x: unknown): x is IFunction {
	// eslint-disable-next-line security/detect-object-injection
	return (x as IFunction | null)?.[SCHEMA_NAME] === 'Function'
}
