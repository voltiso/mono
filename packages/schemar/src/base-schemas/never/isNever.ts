// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'

import type { INever } from './INever'

export function isNeverSchema(x: unknown): x is INever {
	return (x as INever | null)?.[SCHEMA_NAME] === 'Never'
}
