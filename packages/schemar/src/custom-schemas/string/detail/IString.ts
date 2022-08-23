// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '_'
import { SCHEMA_NAME } from '_'

import type {
	DefaultStringOptions,
	ISchema,
	SchemaLike,
	StringOptions,
} from '~'

export interface StringLike extends SchemaLike<string> {
	readonly [SCHEMA_NAME]: 'String'
}

/** Every IString<O> is assignable to IString */
export interface IString extends ISchema<string> {
	readonly [SCHEMA_NAME]: 'String'

	readonly [BASE_OPTIONS]: StringOptions
	readonly [DEFAULT_OPTIONS]: DefaultStringOptions

	get getMinLength(): number | undefined
	get getMaxLength(): number | undefined

	minLength(min: number): any
	maxLength(max: number): any
	length(exactLength: number): any
	lengthRange(min: number, max: number): any
}

export function isString(x: unknown): x is IString {
	// eslint-disable-next-line security/detect-object-injection
	return (x as IString | null)?.[SCHEMA_NAME] === 'String'
}
