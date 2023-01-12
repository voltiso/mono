// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS, OPTIONS } from '@voltiso/util'

import type {
	$$Schemable,
	SCHEMA_NAME,
	SchemaOptions,
	ValidateOptions,
	ValidationIssue,
	ValidationResult,
} from '~'
import { EXTENDS } from '~'

export interface $$Schema {
	readonly [SCHEMA_NAME]: unknown
}

export interface SchemaLike<T = unknown> extends $$Schema {
	get Output(): T
	get Input(): T | undefined
}

// export interface FinalSchema<T> {}

/** Every Schema is assignable to `ISchema` */
export interface ISchema<T = unknown> extends $$Schema, SchemaLike<T> {
	readonly [SCHEMA_NAME]: string // SchemaName

	readonly [BASE_OPTIONS]: SchemaOptions
	readonly [DEFAULT_OPTIONS]: SchemaOptions // not necessarily the global defaults

	readonly [OPTIONS]: SchemaOptions & {
		Output: T
		Input: T | undefined
	}

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
	get Output(): T

	/**
	 * Inferred Input Type (the schema is able to convert these into Output Type)
	 *
	 * - Get the type using `typeof xxx.InputType`
	 * - Type-only (no value at runtime)
	 */
	get Input(): T | undefined

	//

	// GET

	get getName(): string | undefined

	get isOptional(): boolean
	get isStrictOptional(): boolean

	get isReadonly(): boolean

	get hasDefault(): boolean
	get getDefault(): unknown

	//

	//

	name(name: string): $$Schema

	get optional(): $$Schema
	get strictOptional(): $$Schema

	get readonly(): $$Schema
	default(value: T): $$Schema
	default(getValue: () => T): $$Schema

	//

	//

	extends(other: $$Schemable): boolean
	[EXTENDS](other: $$Schema): boolean

	check(
		isValid: (x: any) => boolean,
		expectedDescription?: string | ((x: any) => string),
	): unknown // ISchema

	fix(fixFunc: (x: any) => unknown): unknown // ISchema

	//

	//

	Narrow(): unknown // ISchema
	Widen(): unknown // ISchema | StaticError
	Cast(): unknown // ISchema | StaticError
	$Cast(): unknown // ISchema | StaticError

	NarrowOutput(): unknown // ISchema
	WidenOutput(): unknown // ISchema | StaticError
	CastOutput(): unknown // ISchema | StaticError

	NarrowInput(): unknown // ISchema
	WidenInput(): unknown // ISchema | StaticError
	CastInput(): unknown // ISchema | StaticError

	//

	//

	/**
	 * Validate `this` schema, throw on failure
	 *
	 * @param x - Value to validate against `this` schema
	 * @returns Value after applying transformations (e.g. defaults)
	 * @throws ValidationError
	 */
	validate(x: unknown, options?: Partial<ValidateOptions> | undefined): unknown

	/**
	 * Best-effort fix - same as `exec(x).value`, but does not generate issues
	 * list
	 *
	 * @param x - Value to validate against `this` schema
	 * @returns Value after applying transformations (e.g. defaults)
	 */
	tryValidate(
		x: unknown,
		options?: Partial<ValidateOptions> | undefined,
	): unknown

	/**
	 * Validate `this` schema, do not throw on failure
	 *
	 * @param x - Value to validate against `this` schema
	 * @returns `ValidationResult` - either success or error with issue list
	 */
	exec(
		x: unknown,
		options?: Partial<ValidateOptions> | undefined,
	): ValidationResult

	/**
	 * Do not return transformed value - just check if the value is valid
	 * according to the schema (after applying fixes)
	 *
	 * @param x - Value to validate against `this` schema
	 */
	isFixable(x: unknown, options?: Partial<ValidateOptions> | undefined): boolean

	/**
	 * Do not return transformed value - just check if the value is valid
	 * according to the schema
	 *
	 * @param x - Value to validate against `this` schema
	 */
	isValid(x: unknown, options?: Partial<ValidateOptions> | undefined): boolean

	getIssues(
		value: unknown,
		options?: Partial<ValidateOptions>,
	): ValidationIssue[]

	//

	//

	or(other: $$Schemable): $$Schemable
	and(other: $$Schemable): $$Schemable

	get simple(): $$Schema

	toString(): string
}
