// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'

import type { INever } from './INever'

export function isNever(x: unknown): x is INever {
	// eslint-disable-next-line security/detect-object-injection
	return (x as INever | null)?.[SCHEMA_NAME] === 'Never'
}
