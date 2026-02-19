// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'
import { lazyFunction } from '@voltiso/util'

import type { IVoid, IVoid$ } from './IVoid'

function _isVoidSchema(x: unknown): x is IVoid$ {
	return (x as IVoid | null)?.[SCHEMA_NAME] === 'Void'
}

export const isVoidSchema = lazyFunction(() => _isVoidSchema)
