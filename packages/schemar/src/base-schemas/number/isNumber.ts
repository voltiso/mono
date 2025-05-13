// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'

import type { INumber, INumber$ } from './INumber'

export function isNumberSchema(x: unknown): x is INumber$ {
	return (x as INumber | null)?.[SCHEMA_NAME] === 'Number'
}
