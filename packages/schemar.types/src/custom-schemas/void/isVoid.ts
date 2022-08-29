// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'
import { lazyValue } from '@voltiso/util'

import type { IVoid } from './IVoid'

function _isVoid(x: unknown): x is IVoid {
	// eslint-disable-next-line security/detect-object-injection
	return (x as IVoid | null)?.[SCHEMA_NAME] === 'Void'
}

export const isVoid = lazyValue(() => _isVoid)