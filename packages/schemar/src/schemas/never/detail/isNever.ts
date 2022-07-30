// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { INever } from '~'
import { SCHEMA_NAME } from '~'

export function isNever(x: unknown): x is INever {
	// eslint-disable-next-line security/detect-object-injection
	return (x as INever | null)?.[SCHEMA_NAME] === 'Never'
}
