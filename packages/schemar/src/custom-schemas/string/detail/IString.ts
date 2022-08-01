// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { type BASE_OPTIONS, type DEFAULT_OPTIONS, SCHEMA_NAME } from '_'

import type { DefaultStringOptions, ISchema, StringOptions } from '~'

/** Every IString<O> is assignable to IString */
export interface IString extends ISchema {
	readonly [SCHEMA_NAME]: 'String'

	readonly [BASE_OPTIONS]: StringOptions
	readonly [DEFAULT_OPTIONS]: DefaultStringOptions

	get getMinLength(): number | undefined
	get getMaxLength(): number | undefined

	// minLength(min: number): IString
	// maxLength(max: number): IString
	// length(exactLength: number): IString
	// lengthRange(min: number, max: number): IString
}

export function isString(x: unknown): x is IString {
	// eslint-disable-next-line security/detect-object-injection
	return (x as IString | null)?.[SCHEMA_NAME] === 'String'
}
