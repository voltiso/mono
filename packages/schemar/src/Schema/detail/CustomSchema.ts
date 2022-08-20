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
import type {
	_,
	AlsoAccept,
	Assume,
	IsCompatible,
	IsIdentical,
} from '@voltiso/util'

import type {
	DefaultSchemaOptions,
	DefineSchema,
	MergeSchemaOptions,
	Schemable,
	SchemableLike,
	SchemaOptions,
	SimpleSchema,
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

	extends(other: SchemableLike): boolean
	[EXTENDS](other: ISchema): boolean

	// builder

	/**
	 * Define object property to be optional or undefined
	 *
	 * - Validation will remove `undefined` properties if `this` schema does not
	 *   accept `undefined` by itself
	 *
	 * @inline
	 */
	get optional(): DefineSchema<this, { isOptional: true }>

	/**
	 * Same as `optional`, but does not auto-remove `undefined` properties
	 *
	 * - `undefined` in the input value is considered invalid (similar to
	 *   `exactOptionalPropertyTypes`)
	 *
	 * @inline
	 */
	get strictOptional(): DefineSchema<this, { isStrictOptional: true }>

	/**
	 * Define object property to be `readonly`
	 *
	 * @inline
	 */
	get readonly(): DefineSchema<this, { isReadonly: true }>

	//

	/**
	 * Specify default value if the input value is `undefined`
	 *
	 * @inline
	 */
	default<DefaultValue extends this[OPTIONS]['Output']>(
		value: DefaultValue,
	): WithDefault<this, DefaultValue>

	/**
	 * Specify default value if the input value is `undefined`
	 *
	 * @inline
	 */
	default<DefaultValue extends this[OPTIONS]['Output']>(
		getValue: () => DefaultValue,
	): WithDefault<this, DefaultValue>

	//

	/** @inline */
	withCheck(
		checkIfValid: (x: this[OPTIONS]['Input']) => boolean,
		expectedDescription?: string | ((x: this[OPTIONS]['Input']) => string),
	): this

	/** @inline */
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

	/**
	 * Create union of this schema an one other schema
	 *
	 * - Alternatively, we can use global `union` function
	 *
	 * @inline
	 */
	or<Other extends Schemable>(other: Other): Union<[this, Other]>

	/**
	 * Simplify and flatten TS type
	 *
	 * - No-op at runtime (identity function)
	 * - Use `@voltiso/transform` to output simplified types in `*.d.ts` files
	 * - Useful when exporting from module - faster editor experience for lib consumers
	 *
	 * @inline
	 */
	get simple(): Simplify<this>
}

/** @inline */
export type CanBeSimpleSchema<
	S extends {
		OutputType: any
		InputType: any
		[PARTIAL_OPTIONS]: any
	},
	True = true,
	False = false,
> = 'isOptional' extends keyof S[PARTIAL_OPTIONS]
	? False
	: 'isReadonly' extends keyof S[PARTIAL_OPTIONS]
	? False
	: false extends IsCompatible<S['OutputType'], S['InputType']>
	? False
	: True

/** @inline */
export type Simplify<
	This extends {
		OutputType: any
		InputType: any
		[PARTIAL_OPTIONS]: any
	},
> = CanBeSimpleSchema<This> extends true
	? SimpleSchema<This[PARTIAL_OPTIONS]['Output']>
	: CustomSchema<
			_<
				Pick<
					This[PARTIAL_OPTIONS],
					Extract<keyof This[PARTIAL_OPTIONS], 'isOptional' | 'isReadonly'>
				> &
					IsIdentical<
						This['OutputType'],
						unknown,
						unknown,
						{ Output: This['OutputType'] }
					> &
					IsIdentical<
						This['InputType'],
						unknown,
						unknown,
						{ Input: This['InputType'] }
					>
			>
	  >
// : CustomSchema<{
// 		Output: This['OutputType']
// 		Input: This['InputType']
// 		isOptional: This['isOptional']
// 		isReadonly: This['isReadonly']
//   }>

/** @inline */
export type WithDefault<This, DefaultValue> = This extends {
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
