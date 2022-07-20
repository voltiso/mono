// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ISchema } from '../../schema'
import type { StringOptions } from './_/StringOptions.js'

export const IS_STRING = Symbol('IS_STRING')
export type IS_STRING = typeof IS_STRING

/** Every IString<O> is assignable to IString */
export interface IString<O extends StringOptions = StringOptions>
	extends ISchema<O> {
	readonly [IS_STRING]: true

	readonly getMinLength: O['minLength']
	readonly getMaxLength: O['maxLength']
	readonly getRegExps: O['regExps']
}

export function isString(x: unknown): x is IString {
	// eslint-disable-next-line security/detect-object-injection
	return Boolean((x as IString | null)?.[IS_STRING])
}
