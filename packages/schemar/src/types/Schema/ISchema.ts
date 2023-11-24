// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { EXTENDS } from '_'
import type {
	AlsoAccept,
	BASE_OPTIONS,
	DEFAULT_OPTIONS,
	NoArgument,
	OPTIONS,
	StaticError,
} from '@voltiso/util'

import type {
	$$Schemable,
	CustomFix,
	CustomOperation,
	Output_,
	SCHEMA_NAME,
	SchemaOptions,
	ValidationIssue,
	ValidationOptions,
	ValidationResult,
} from '~'

export interface $$Schema {
	readonly [SCHEMA_NAME]: unknown
}

export interface SchemaLike<T = unknown> extends $$Schema {
	get Output(): T
	get Input(): T | undefined
}

/**
 * Every schema is assignable to {@link Schema}
 *
 * - Also @see {@link Schema$ } for a version with builder interface
 */
export interface Schema<T = unknown> extends $$Schema, SchemaLike<T> {
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
	get getDefault(): unknown // or throw

	get getCustomFixes(): readonly CustomFix[]
	get getCustomOperations(): readonly CustomOperation[]

	//

	extends(other: $$Schemable): boolean
	[EXTENDS](other: $$Schema): boolean

	/**
	 * Validate `this` schema, throw on failure
	 *
	 * @param x - Value to validate against `this` schema
	 * @returns Value after applying transformations (e.g. defaults)
	 * @throws ValidationError
	 */
	validate(
		x: unknown,
		options?: Partial<ValidationOptions> | undefined,
	): unknown

	/**
	 * Best-effort fix - same as `exec(x).value`, but does not generate issues
	 * list
	 *
	 * @param x - Value to validate against `this` schema
	 * @returns Value after applying transformations (e.g. defaults)
	 */
	tryValidate(
		x: unknown,
		options?: Partial<ValidationOptions> | undefined,
	): unknown

	/**
	 * Validate `this` schema, do not throw on failure
	 *
	 * @param x - Value to validate against `this` schema
	 * @returns `ValidationResult` - either success or error with issue list
	 */
	exec(
		x: unknown,
		options?: Partial<ValidationOptions> | undefined,
	): ValidationResult

	/**
	 * Do not return transformed value - just check if the value is valid
	 * according to the schema (after applying fixes)
	 *
	 * @param x - Value to validate against `this` schema
	 */
	isFixable(
		x: unknown,
		options?: Partial<ValidationOptions> | undefined,
	): boolean

	assertFixable(
		x: unknown,
		options?: Partial<ValidationOptions> | undefined,
	): void

	/**
	 * Do not return transformed value - just check if the value is valid
	 * according to the schema
	 *
	 * @param x - Value to validate against `this` schema
	 */
	isValid(x: unknown, options?: Partial<ValidationOptions> | undefined): boolean

	assertValid(
		x: unknown,
		options?: Partial<ValidationOptions> | undefined,
	): void

	getIssues(
		value: unknown,
		options?: Partial<ValidationOptions>,
	): ValidationIssue[]
}

/**
 * Every schema$ is assignable to `Schema$`
 *
 * - ⚠️ Prefer {@link Schema} for a super-type without the builder methods
 * - Never try to trigger assignability testing of these recursive types (super
 *   slow)
 */
export interface Schema$<T = unknown> extends Schema<T> {
	/** Specify name for nicer messages */
	name(name: string): this

	get optional(): Schema$<T>
	get strictOptional(): Schema$<T>

	get readonly(): Schema$<T>
	default(value: T): $$Schema
	default(getValue: () => T): $$Schema

	get deleted(): Schema$

	//

	/**
	 * Add a custom check between transformations
	 *
	 * @inline
	 */
	check(
		checkIfValid: (value: this[OPTIONS]['Output']) => boolean,
		expectedDescription?: string | ((value: this[OPTIONS]['Output']) => string),
	): this

	/**
	 * Same as `map`, but with narrow-only typings
	 *
	 * - Return `undefined` only if the value is already correct
	 * - ⚠️ Return exactly the same value if the value is already correct -
	 *   otherwise `.isValid` will incorrectly return `false`, as it uses
	 *   `Object.is` to check if value was already valid
	 * - ⚠️ Do not modify the input value
	 *
	 * @inline
	 */
	narrow<NarrowOutput extends this['Output']>(
		map: (value: this['Output']) => NarrowOutput | void,
	): $$Schema

	/** Does not type-narrow */
	narrowIf(
		condition: (value: this['Output']) => boolean,
		map: (value: this['Output']) => this['Output'] | void | undefined,
	): $$Schema

	/**
	 * Push transformation applied after anything else
	 *
	 * - Return `undefined` only if the value is already correct
	 * - ⚠️ Return exactly the same value if the value is already correct -
	 *   otherwise `.isValid` will incorrectly return `false`, as it uses
	 *   `Object.is` to check if value was already valid
	 * - ⚠️ Prefer {@link fix} - avoid transforms
	 * - ⚠️ Prefer {@link narrow} for type-safety
	 * - ⚠️ Do not modify the input value
	 *
	 * @inline
	 */
	map<NewOutput>(
		map: (value: this[OPTIONS]['Output']) => NewOutput | void | undefined,
	): $$Schema

	mapIf<AdditionalOutput>(
		condition: (value: this[OPTIONS]['Output']) => boolean,
		map: (
			value: this[OPTIONS]['Output'],
		) => AdditionalOutput | void | undefined,
	): $$Schema

	/**
	 * Function-based condition are separated from schema-based conditions for
	 * faster type-checking
	 */
	fixIf<AdditionalInput>(
		conditionTypeGuard: (
			value: AdditionalInput | AlsoAccept<unknown>,
		) => value is AdditionalInput,
		fix: (value: AdditionalInput) => this[OPTIONS]['Input'],
	): $$Schema

	fixIf<AdditionalInput = NoArgument>(
		conditionPredicate: (
			value: AdditionalInput | AlsoAccept<unknown>,
		) => boolean,
		fix: (value: AdditionalInput) => unknown, // this[OPTIONS]['Input'],
	): $$Schema | StaticError

	/**
	 * Executed only if `wrongValueSchema` passes validation
	 *
	 * @example
	 *
	 * ```ts
	 * const timestamp = s.date.fix(s.string, value => new Date(value))
	 * ```
	 *
	 * - ⚠️ Return exactly the same value if the value is already correct -
	 *   otherwise `.isValid` will incorrectly return `false`, as it uses
	 *   `Object.is` to check if value was already valid
	 * - ⚠️ Schema's input type will be extended with the whole input type of
	 *   `wrongValueSchema`
	 * - ⚠️ Do not modify the input value
	 *
	 *
	 * @inline
	 */
	fix<AdditionalInput>(
		conditionSchema: $$Schema & {
			Output: AdditionalInput
			Input: AdditionalInput
		},
		fix: (value: AdditionalInput) => this[OPTIONS]['Input'],
	): $$Schema

	fix<ConditionSchema extends $$Schemable>(
		conditionSchema: ConditionSchema,
		fix: (value: Output_<ConditionSchema>) => this[OPTIONS]['Input'],
	): $$Schema

	/** ⚠️ Please provide `AdditionalInput` type argument */
	fix<AdditionalInput = NoArgument>(
		fix: <Value extends AdditionalInput | AlsoAccept<unknown>>(
			value: Value,
		) => this[OPTIONS]['Input'] | void | undefined, // Value extends AdditionalInput ? this[OPTIONS]['Input'] : void,
	): $$Schema | StaticError

	//
	implicitFix(conditionSchema: $$Schema, fix: (value: any) => any): Schema$
	implicitFix(fix: (value: any) => any): Schema$

	//

	Narrow(): Schema$
	$Narrow(): Schema$

	Widen(): Schema$
	$Widen(): Schema$

	Cast(): Schema$
	$Cast(): Schema$

	NarrowOutput(): Schema$
	$NarrowOutput(): Schema$

	WidenOutput(): Schema$
	$WidenOutput(): Schema$

	CastOutput(): Schema$
	$CastOutput(): Schema$

	NarrowInput(): Schema$
	$NarrowInput(): Schema$

	WidenInput(): Schema$
	$WidenInput(): Schema$

	CastInput(): Schema$
	$CastInput(): Schema$

	//

	or(other: $$Schemable): Schema$
	and(other: $$Schemable): Schema$

	/** Type-cast to the non-builder version */
	get Final(): Schema<T>

	toString(): string
}
