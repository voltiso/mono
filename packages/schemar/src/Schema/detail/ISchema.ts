// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SCHEMA_NAME, Schemable, SchemaName, SchemaOptions } from '~'

import type {
	BASE_OPTIONS,
	DEFAULT_OPTIONS,
	OPTIONS,
	PARTIAL_OPTIONS,
} from './symbols'
import { EXTENDS } from './symbols'

// export const IS_SCHEMA = Symbol('IS_SCHEMA')
// export type IS_SCHEMA = typeof IS_SCHEMA

/** Every Schema is assignable to `ISchema` */
export interface ISchema {
	readonly [SCHEMA_NAME]: SchemaName

	readonly [BASE_OPTIONS]: SchemaOptions
	readonly [DEFAULT_OPTIONS]: SchemaOptions

	readonly [PARTIAL_OPTIONS]: {}
	readonly [OPTIONS]: SchemaOptions

	/**
	 * Type-only (no value at runtime)
	 *
	 * - Get the type using `typeof xxx.Type`
	 * - Alias to `.Out`
	 */
	get Type(): unknown

	/**
	 * Inferred Type (output - after fixing)
	 *
	 * - Get the type using `typeof xxx.Out`
	 * - Type-only (no value at runtime)
	 */
	get OutputType(): unknown

	/**
	 * Inferred Input Type (the schema is able to convert these into Output Type)
	 *
	 * - Get the type using `typeof xxx.In`
	 * - Type-only (no value at runtime)
	 */
	get InputType(): unknown

	get isOptional(): boolean
	get isReadonly(): boolean

	get hasDefault(): boolean
	get getDefault(): unknown

	get optional(): ISchema
	get readonly(): ISchema
	// default(value: any): ISchema

	extends(other: Schemable): boolean
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
	// tryValidate(x: unknown): ValidationResult

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

	// or(other: ISchema): IUnion
}
