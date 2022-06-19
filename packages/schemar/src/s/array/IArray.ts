import { ISchema } from '../../schema'
import { ArrayOptions } from './_/ArrayOptions'

export const IS_ARRAY = Symbol('IS_ARRAY')
export type IS_ARRAY = typeof IS_ARRAY

export interface IArray<O extends ArrayOptions = ArrayOptions>
	extends ISchema<O> {
	readonly [IS_ARRAY]: true

	readonly getElementSchema: O['element']
	readonly isReadonlyArray: O['readonlyArray']
	readonly getMinLength: O['minLength']
	readonly getMaxLength: O['maxLength']

	readonly readonlyArray: IArray
}

export function isArray(x: unknown): x is IArray {
	return !!(x as IArray | null)?.[IS_ARRAY]
}
