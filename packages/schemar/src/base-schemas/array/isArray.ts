// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'

import type { IArray, IArray$ } from './IArray'

export function isArraySchema(x: unknown): x is IArray$ {
	return (x as IArray | null)?.[SCHEMA_NAME] === 'Array'
}
