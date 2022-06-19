import { ISchema } from '../../schema'
import { StringOptions } from './_/StringOptions'

export const IS_STRING = Symbol('IS_STRING')
export type IS_STRING = typeof IS_STRING

/**
 * Every IString<O> is assignable to IString
 */
export interface IString<O extends StringOptions = StringOptions>
	extends ISchema<O> {
	readonly [IS_STRING]: true

	readonly getMinLength: O['minLength']
	readonly getMaxLength: O['maxLength']
	readonly getRegExps: O['regExps']
}

export function isString(x: unknown): x is IString {
	return !!(x as IString | null)?.[IS_STRING]
}
