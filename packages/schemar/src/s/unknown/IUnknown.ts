// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ISchema } from '../../schema'
import type { UnknownOptions } from './_/UnknownOptions.js'

export const IS_UNKNOWN = Symbol('IS_UNKNOWN')
export type IS_UNKNOWN = typeof IS_UNKNOWN

export interface IUnknown<O extends UnknownOptions = UnknownOptions>
	extends ISchema<O> {
	readonly [IS_UNKNOWN]: true
}

export function isUnknown(x: unknown): x is IUnknown {
	// eslint-disable-next-line security/detect-object-injection
	return Boolean((x as IUnknown | null)?.[IS_UNKNOWN])
}
