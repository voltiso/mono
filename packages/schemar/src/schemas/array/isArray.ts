// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '~'

import type { IArray } from './IArray'

export function isArray(x: unknown): x is IArray {
	// eslint-disable-next-line security/detect-object-injection
	return (x as IArray | null)?.[SCHEMA_NAME] === 'Array'
}
