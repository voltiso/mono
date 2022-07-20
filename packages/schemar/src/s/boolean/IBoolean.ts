// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ISchema } from '../../schema'
import type { BooleanOptions } from './_/BooleanOptions.js'

export const IS_BOOLEAN = Symbol('IS_BOOLEAN')
export type IS_BOOLEAN = typeof IS_BOOLEAN

export interface IBoolean<O extends BooleanOptions = BooleanOptions>
	extends ISchema<O> {
	readonly [IS_BOOLEAN]: true
}

export function isBoolean(x: unknown): x is IBoolean {
	// eslint-disable-next-line security/detect-object-injection
	return Boolean((x as IBoolean | null)?.[IS_BOOLEAN])
}
