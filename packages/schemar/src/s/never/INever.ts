// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ISchema } from '../../schema'
import type { NeverOptions } from './_/NeverOptions.js'

export const IS_NEVER = Symbol('IS_NEVER')
export type IS_NEVER = typeof IS_NEVER

export interface INever<O extends NeverOptions = NeverOptions>
	extends ISchema<O> {
	readonly [IS_NEVER]: true
}

export function isNever(x: unknown): x is INever {
	// eslint-disable-next-line security/detect-object-injection
	return Boolean((x as INever | null)?.[IS_NEVER])
}
