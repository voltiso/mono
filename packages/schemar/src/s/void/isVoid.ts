// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue } from '@voltiso/util'

import type { IVoid } from './IVoid.js'

export const IS_VOID = Symbol('IS_VOID')
export type IS_VOID = typeof IS_VOID

function _isVoid(x: unknown): x is IVoid {
	// eslint-disable-next-line security/detect-object-injection
	return Boolean((x as IVoid | null)?.[IS_VOID])
}

export const isVoid = lazyValue(() => _isVoid)
