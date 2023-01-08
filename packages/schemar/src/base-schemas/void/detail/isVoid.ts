// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'
import { lazyValue } from '@voltiso/util'

import type { IVoid } from './IVoid'

function _isVoidSchema(x: unknown): x is IVoid {
	// eslint-disable-next-line security/detect-object-injection
	return (x as IVoid | null)?.[SCHEMA_NAME] === 'Void'
}

export const isVoidSchema = lazyValue(() => _isVoidSchema)
