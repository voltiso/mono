// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { OPTIONS, PARTIAL_OPTIONS, SCHEMA_NAME } from '_'
import { EXTENDS } from '_'

import type { SchemableLike, SchemaOptions, ValidationResult } from '~'

// export const IS_SCHEMA = Symbol('IS_SCHEMA')
// export type IS_SCHEMA = typeof IS_SCHEMA

export interface ISchemaLike<T = unknown> {
	readonly [SCHEMA_NAME]: string
	get Type(): T
}

/** Every Schema is assignable to `ISchema` */
export interface ISchema<T = unknown> extends ISchemaLike {
	readonly [SCHEMA_NAME]: string // SchemaName

	// readonly [BASE_OPTIONS]: SchemaOptions
	// readonly [DEFAULT_OPTIONS]: SchemaOptions

	readonly [PARTIAL_OPTIONS]: {}
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
	get InputType(): T

	get isOptional(): boolean
	get isStrictOptional(): boolean

	get isReadonly(): boolean

	get hasDefault(): boolean
	get getDefault(): unknown

	get optional(): ISchema
	get strictOptional(): ISchema

	get readonly(): ISchema
	default(value: T): ISchema
	default(getValue: () => T): ISchema

	extends(other: SchemableLike): boolean
	[EXTENDS](other: ISchema): boolean

	withCheck(
		checkIfValid: (x: any) => boolean,
		expectedDescription?: string | ((x: any) => string),
	): ISchema

	withFix(fixFunc: (x: any) => unknown): ISchema

	//
	// RootSchema
	//

	toString(): string

	/**
	 * Validate `this` schema, do not throw on failure
	 *
	 * @param x - Value to validate against `this` schema
	 * @returns `ValidationResult` - either success or error with issue list
	 */
	tryValidate(x: unknown): ValidationResult

	/**
	 * Validate `this` schema, throw on failure
	 *
	 * @param x - Value to validate against `this` schema
	 * @returns Value after applying transformations (e.g. defaults)
	 * @throws ValidationError
	 */
	validate(x: unknown): unknown

	/**
	 * Do not return transformed value - just check if the value is valid
	 * according to the schema
	 *
	 * @param x - Value to validate against `this` schema
	 */
	isValid(x: unknown): boolean

	// or(other: ISchema): ISchema //!

	// get simple(): ISchema //!
}
