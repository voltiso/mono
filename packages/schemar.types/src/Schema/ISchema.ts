// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	BASE_OPTIONS,
	DEFAULT_OPTIONS,
	OPTIONS,
	PARTIAL_OPTIONS,
	SCHEMA_NAME,
} from '_'
import { EXTENDS } from '_'

import type { SchemableLike, SchemaOptions, ValidationResult } from '~'

// export const IS_SCHEMA = Symbol('IS_SCHEMA')
// export type IS_SCHEMA = typeof IS_SCHEMA

export interface SchemaLike<T = unknown> {
	readonly [SCHEMA_NAME]: any

	readonly [OPTIONS]: any

	get Type(): T
	get OutputType(): T
	get InputType(): T | undefined
	get simple(): any
	tryValidate(x: unknown): unknown
	extends(x: unknown): boolean
}

/** Every Schema is assignable to `ISchema` */
export interface ISchema<T = unknown> extends SchemaLike<T> {
	readonly [SCHEMA_NAME]: string // SchemaName

	readonly [BASE_OPTIONS]: SchemaOptions
	readonly [DEFAULT_OPTIONS]: SchemaOptions

	readonly [PARTIAL_OPTIONS]: {} // Partial<SchemaOptions>
	readonly [OPTIONS]: SchemaOptions

	/**
	 * Type-only (no value at runtime)
	 *
	 * - Get the type using `typeof xxx.Type`
	 * - Alias to `.OutputType`
	 */
	get Type(): T

	/**
	 * Inferred Type (output - after fixing)
	 *
	 * - Get the type using `typeof xxx.OutputType`
	 * - Type-only (no value at runtime)
	 */
	get OutputType(): T

	/**
	 * Inferred Input Type (the schema is able to convert these into Output Type)
	 *
	 * - Get the type using `typeof xxx.InputType`
	 * - Type-only (no value at runtime)
	 */
	get InputType(): T | undefined

	get isOptional(): boolean
	get isStrictOptional(): boolean

	get isReadonly(): boolean

	get hasDefault(): boolean
	get getDefault(): unknown

	get optional(): any // ISchema
	get strictOptional(): any // ISchema

	get readonly(): any // ISchema
	default(value: T): any // ISchema
	default(getValue: () => T): any // ISchema

	extends(other: SchemableLike): boolean
	[EXTENDS](other: SchemaLike): boolean

	check(
		isValid: (x: any) => boolean,
		expectedDescription?: string | ((x: any) => string),
	): any // ISchema

	fix(fixFunc: (x: any) => unknown): any // ISchema

	//

	//

	Narrow(): any // ISchema
	Widen(): any // ISchema | StaticError
	Cast(): any // ISchema | StaticError

	NarrowOutput(): any // ISchema
	WidenOutput(): any // ISchema | StaticError
	CastOutput(): any // ISchema | StaticError

	NarrowInput(): any // ISchema
	WidenInput(): any // ISchema | StaticError
	CastInput(): any // ISchema | StaticError

	//

	//

	/**
	 * Validate `this` schema, throw on failure
	 *
	 * @param x - Value to validate against `this` schema
	 * @returns Value after applying transformations (e.g. defaults)
	 * @throws ValidationError
	 */
	validate(x: unknown): unknown

	/**
	 * Best-effort fix - same as `exec(x).value`, but does not generate issues
	 * list
	 *
	 * @param x - Value to validate against `this` schema
	 * @returns Value after applying transformations (e.g. defaults)
	 */
	tryValidate(x: unknown): unknown

	/**
	 * Validate `this` schema, do not throw on failure
	 *
	 * @param x - Value to validate against `this` schema
	 * @returns `ValidationResult` - either success or error with issue list
	 */
	exec(x: unknown): ValidationResult

	/**
	 * Do not return transformed value - just check if the value is valid
	 * according to the schema
	 *
	 * @param x - Value to validate against `this` schema
	 */
	isValid(x: unknown): boolean

	or(other: any /* ISchema*/): any // ISchema //!

	get simple(): any // ISchema //!

	toString(): string
}
