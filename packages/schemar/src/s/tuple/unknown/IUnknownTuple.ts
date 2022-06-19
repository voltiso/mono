import { ISchema } from '../../../schema'
import { UnknownTupleOptions } from './_/UnknownTupleOptions'

export const IS_UNKNOWN_TUPLE = Symbol('IS_UNKNOWN_TUPLE')
export type IS_UNKNOWN_TUPLE = typeof IS_UNKNOWN_TUPLE

export interface IUnknownTuple<
	O extends UnknownTupleOptions = UnknownTupleOptions
> extends ISchema<O> {
	readonly [IS_UNKNOWN_TUPLE]: true

	readonly isReadonlyTuple: O['readonlyTuple']
	readonly getMinLength: O['minLength']
	readonly getMaxLength: O['maxLength']
}

export function isUnknownTuple(x: unknown): x is IUnknownTuple {
	return !!(x as IUnknownTuple | null)?.[IS_UNKNOWN_TUPLE]
}
