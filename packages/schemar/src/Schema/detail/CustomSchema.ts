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
import type { AlsoAccept, Assume } from '@voltiso/util'

import type {
	DefaultSchemaOptions,
	DefineSchema,
	MergeSchemaOptions,
	Schemable,
	Schemable_,
	SchemaOptions,
	Union,
	ValidationIssue,
	ValidationResult,
} from '~'

import type { ISchema } from './ISchema'

export interface CustomSchema<O extends Partial<SchemaOptions> = {}> {
	//
	readonly [SCHEMA_NAME]: string // SchemaName

	readonly [BASE_OPTIONS]: SchemaOptions

	readonly [DEFAULT_OPTIONS]: DefaultSchemaOptions

	readonly [PARTIAL_OPTIONS]: O

	// [OPTIONS]: this[BASE_OPTIONS]

	readonly [OPTIONS]: Assume<
		this[BASE_OPTIONS],
		MergeSchemaOptions<this[DEFAULT_OPTIONS], this[PARTIAL_OPTIONS]>
	>

	/**
	 * Type-only (no value at runtime)
	 *
	 * - Get the type using `typeof xxx.Type`
	 * - Alias to `.OutputType`
	 */
	get Type(): this['OutputType']

	/**
	 * Inferred Type (output - after fixing)
	 *
	 * - Get the type using `typeof xxx.OutputType`
	 * - Type-only (no value at runtime)
	 */
	get OutputType(): this[OPTIONS]['Output']
	// | (this[OPTIONS]['isOptional'] extends true ? undefined : never)

	/**
	 * Inferred Input Type (the schema is able to convert these into Output Type)
	 *
	 * - Get the type using `typeof xxx.InputType`
	 * - Type-only (no value at runtime)
	 */
	get InputType():
		| this[OPTIONS]['Input']
		| (this[OPTIONS]['isOptional'] extends true
				? undefined
				: this[OPTIONS]['hasDefault'] extends true
				? undefined
				: never)

	get isOptional(): this[OPTIONS]['isOptional']
	get isStrictOptional(): this[OPTIONS]['isStrictOptional']

	get isReadonly(): this[OPTIONS]['isReadonly']

	get hasDefault(): this[OPTIONS]['hasDefault']
	get getDefault(): this[OPTIONS]['hasDefault'] extends false
		? never
		: this[OPTIONS]['Output']

	extends(other: Schemable_): boolean
	[EXTENDS](other: ISchema): boolean

	// builder

	/**
	 * Define object property to be optional or undefined
	 *
	 * - Validation will remove `undefined` properties if `this` schema does not
	 *   accept `undefined` by itself
	 */
	get optional(): DefineSchema<this, { isOptional: true }>

	/**
	 * Same as `optional`, but does not auto-remove `undefined` properties
	 *
	 * - `undefined` in the input value is considered invalid (similar to
	 *   `exactOptionalPropertyTypes`)
	 */
	get strictOptional(): DefineSchema<this, { isStrictOptional: true }>

	/** Define object property to be `readonly` */
	get readonly(): DefineSchema<this, { isReadonly: true }>

	/** Specify default value if the input value is `undefined` */
	default<DefaultValue extends this[OPTIONS]['Output']>(
		value: DefaultValue,
	): WithDefault<this, DefaultValue>

	withCheck(
		checkIfValid: (x: this[OPTIONS]['Input']) => boolean,
		expectedDescription?: string | ((x: this[OPTIONS]['Input']) => string),
	): this

	withFix<Out extends this[OPTIONS]['Output']>(
		fixFunc: (x: this[OPTIONS]['Input']) => Out | void,
	): DefineSchema<this, { Output: Out }>

	//

	/**
	 * Validate `this` schema, do not throw on failure
	 *
	 * @param x - Value to validate against `this` schema
	 * @returns `ValidationResult` - either success or error with issue list
	 */
	tryValidate(x: this[OPTIONS]['Input'] | AlsoAccept<unknown>): ValidationResult

	/**
	 * Validate `this` schema, throw on failure
	 *
	 * @param x - Value to validate against `this` schema
	 * @returns Value after applying transformations (e.g. defaults)
	 * @throws ValidationError
	 */
	validate(
		x: this[OPTIONS]['Input'] | AlsoAccept<unknown>,
	): this[OPTIONS]['Output']

	/**
	 * Check if `x` is already valid (without applying fixes)
	 *
	 * @param x - Value to validate against `this` schema, without applying fixes
	 */
	getIssues(x: this[OPTIONS]['Input'] | AlsoAccept<unknown>): ValidationIssue[]

	/**
	 * Do not return transformed value - just check if the value is valid
	 * according to the schema (after applying fixes)
	 *
	 * @param x - Value to validate against `this` schema
	 */
	isFixable(
		x: this[OPTIONS]['Input'] | AlsoAccept<unknown>,
	): x is this[OPTIONS]['Input']

	/**
	 * Check if `x` is already valid (without applying fixes)
	 *
	 * @param x - Value to validate against `this` schema, without applying fixes
	 */
	isValid(
		x: this[OPTIONS]['Input'] | AlsoAccept<unknown>,
	): x is this[OPTIONS]['Output']

	or<Other extends Schemable>(other: Other): Union<[this, Other]>
}

type WithDefault<This, DefaultValue> = This extends {
	[OPTIONS]: { Output: unknown }
}
	? DefineSchema<
			This,
			{
				hasDefault: true
				default: DefaultValue
				Output: Exclude<This[OPTIONS]['Output'], undefined>
			}
	  >
	: never
