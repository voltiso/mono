// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ISchema } from '../../../Schema/index'
import type { UnknownTupleOptions } from './_/UnknownTupleOptions.js'

export const IS_UNKNOWN_TUPLE = Symbol('IS_UNKNOWN_TUPLE')
export type IS_UNKNOWN_TUPLE = typeof IS_UNKNOWN_TUPLE

export interface IUnknownTuple<
	O extends UnknownTupleOptions = UnknownTupleOptions,
> extends ISchema<O> {
	readonly [IS_UNKNOWN_TUPLE]: true

	readonly isReadonlyTuple: O['isReadonlyTuple']
	readonly getMinLength: O['minLength']
	readonly getMaxLength: O['maxLength']
}

export function isUnknownTuple(x: unknown): x is IUnknownTuple {
	// eslint-disable-next-line security/detect-object-injection
	return Boolean((x as IUnknownTuple | null)?.[IS_UNKNOWN_TUPLE])
}
