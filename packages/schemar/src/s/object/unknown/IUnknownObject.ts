// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ISchema } from '../../../schema'
import type { UnknownObjectOptions } from './_/UnknownObjectOptions.js'

export const IS_UNKNOWN_OBJECT = Symbol('IS_UNKNOWN_OBJECT')
export type IS_UNKNOWN_OBJECT = typeof IS_UNKNOWN_OBJECT

export interface IUnknownObject<
	O extends UnknownObjectOptions = UnknownObjectOptions,
> extends ISchema<O> {
	readonly [IS_UNKNOWN_OBJECT]: true
}

export function isUnknownObject(x: unknown): x is IUnknownObject {
	// eslint-disable-next-line security/detect-object-injection
	return Boolean((x as IUnknownObject | null)?.[IS_UNKNOWN_OBJECT])
}
