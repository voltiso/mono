// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ISchema } from '../../schema'
import type { VoidOptions } from './_/VoidOptions.js'

export const IS_VOID = Symbol('IS_VOID')
export type IS_VOID = typeof IS_VOID

export interface IVoid<O extends VoidOptions = VoidOptions> extends ISchema<O> {
	readonly [IS_VOID]: true
}

export function isVoid(x: unknown): x is IVoid {
	// eslint-disable-next-line security/detect-object-injection
	return Boolean((x as IVoid | null)?.[IS_VOID])
}
