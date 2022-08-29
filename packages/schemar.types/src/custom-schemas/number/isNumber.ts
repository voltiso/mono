// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'

import type { INumber } from './INumber'

export function isNumber(x: unknown): x is INumber {
	// eslint-disable-next-line security/detect-object-injection
	return (x as INumber | null)?.[SCHEMA_NAME] === 'Number'
}
