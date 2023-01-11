// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { EXTENDS } from '_'
import type {
	_,
	$_,
	$Omit,
	AlsoAccept,
	BASE_OPTIONS,
	DEFAULT_OPTIONS,
	OPTIONS,
	Override,
	PARTIAL_OPTIONS,
	Throw,
} from '@voltiso/util'

import type {
	$$Schema,
	$$Schemable,
	DefaultSchemaOptions,
	DefineSchema,
	GetIssuesOptions,
	GetSchemaByName,
	InferSchema,
	ISchema,
	SCHEMA_NAME,
	SchemaOptions,
	SchemarAnd,
	SchemarOr,
	ValidateOptions,
	ValidationIssue,
	ValidationResult,
} from '~'

import type { SimplifySchema } from './Simplify'

export interface CustomSchema<O extends Partial<SchemaOptions> = {}>
	extends ISchema {
	//
	readonly [SCHEMA_NAME]: string // SchemaName

	readonly [BASE_OPTIONS]: SchemaOptions
	readonly [DEFAULT_OPTIONS]: DefaultSchemaOptions
	readonly [PARTIAL_OPTIONS]: O

	readonly [OPTIONS]: Override<this[DEFAULT_OPTIONS], this[PARTIAL_OPTIONS]>

	/**
	 * Type-only (no value at runtime)
	 *
	 * - Get the type using `typeof xxx.Type`
	 * - Alias to {@link Output}
	 */
	get Type(): this['Output']

	/**
	 * Inferred Type (output - after fixing)
	 *
	 * - Get the type using `typeof xxx.OutputType`
	 * - Type-only (no value at runtime)
	 */
	get Output(): this[OPTIONS]['Output']
	// | (this[OPTIONS]['isOptional'] extends true ? undefined : never)

	/**
	 * Inferred Input Type (the schema is able to convert these into Output Type)
	 *
	 * - Get the type using `typeof xxx.Input`
	 * - Type-only (no value at runtime)
	 */
	get Input():
		| this[OPTIONS]['Input']
		| (this[OPTIONS]['isOptional'] extends true
				? undefined
				: this[OPTIONS]['hasDefault'] extends true
				? undefined
				: never)

	// GET

	get getName(): string | undefined

	get isOptional(): this[OPTIONS]['isOptional']
	get isStrictOptional(): this[OPTIONS]['isStrictOptional']

	get isReadonly(): this[OPTIONS]['isReadonly']

	get hasDefault(): this[OPTIONS]['hasDefault']
	get getDefault(): this[OPTIONS]['hasDefault'] extends false
		? never
		: this[OPTIONS]['Output']

	extends(other: $$Schemable): boolean
	[EXTENDS](other: $$Schema): boolean

	// builder

	/** Specify name for nicer messages */
	name(name: string): this

	/**
	 * Define object property to be optional or undefined
	 *
	 * - Validation will remove `undefined` properties if `this` schema does not
	 *   accept `undefined` by itself
	 *
	 * @inline
	 */
	get optional(): GetSchemaByName<
		this[SCHEMA_NAME],
		$_<
			$Omit<
				Override<this[PARTIAL_OPTIONS], { isOptional: true }>,
				'isStrictOptional' | 'default' | 'hasDefault'
			>
		>
	>
	// DefineSchema<this, { isOptional: true }>

	/**
	 * Same as `optional`, but does not auto-remove `undefined` properties
	 *
	 * - `undefined` in the input value is considered invalid (similar to
	 *   `exactOptionalPropertyTypes`)
	 * - Use if you differentiate between `undefined` and non-present properties
	 *
	 * @inline
	 */
	get strictOptional(): GetSchemaByName<
		this[SCHEMA_NAME],
		$_<
			$Omit<
				Override<this[PARTIAL_OPTIONS], { isStrictOptional: true }>,
				'isOptional' | 'default' | 'hasDefault'
			>
		>
	> // DefineSchema<this, { isStrictOptional: true }>

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
	default<DefaultValue extends this[OPTIONS]['Input']>(
		value: DefaultValue,
	): CustomSchema.WithDefault<this, DefaultValue>

	/**
	 * Specify default value if the input value is `undefined`
	 *
	 * @inline
	 */
	default<DefaultValue extends this[OPTIONS]['Input']>(
		getValue: () => DefaultValue,
	): CustomSchema.WithDefault<this, DefaultValue>

	//

	/** @inline */
	check(
		checkIfValid: (x: this[OPTIONS]['Input']) => boolean,
		expectedDescription?: string | ((x: this[OPTIONS]['Input']) => string),
	): this

	/**
	 * Applied after all other transformations are done (e.g. defaults already
	 * applied)
	 *
	 * - ⚠️ Do not modify the input value
	 * - I.e. it narrows the Output type into its (sub)type
	 *
	 * @inline
	 */
	fix<NarrowToType extends this[OPTIONS]['Output']>(
		fixFunc: (value: this[OPTIONS]['Output']) => NarrowToType | void,
	): DefineSchema<this, { Output: NarrowToType }>

	//

	//

	Narrow<NewType extends this['Output'] & this['Input']>(): DefineSchema<
		this,
		{ Output: NewType; Input: NewType }
	>

	Widen<NewType>(): this['Output'] | this['Input'] extends NewType
		? DefineSchema<this, { Output: NewType; Input: NewType }>
		: Throw<
				'Widen: NewType is not supertype' &
					CustomSchema.TypeCastErrorDetail<this, NewType>
		  >

	//

	Cast<NewType>(): CustomSchema.CastResult<this, NewType>

	$Cast<NewType>(): NewType extends any
		? CustomSchema.CastResult<this, NewType>
		: never

	//

	NarrowOutput<NewType extends this['Output']>(): DefineSchema<
		this,
		{ Output: NewType }
	>

	WidenOutput<NewType>(): this['Output'] extends NewType
		? DefineSchema<this, { Output: NewType }>
		: Throw<
				'WidenOutput: NewType is not supertype' &
					CustomSchema.TypeCastErrorDetailOutput<this, NewType>
		  >

	CastOutput<NewType>(): this['Output'] extends NewType
		? DefineSchema<this, { Output: NewType }>
		: NewType extends this['Output']
		? DefineSchema<this, { Output: NewType }>
		: Throw<
				'CastOutput: NewType is not subtype or supertype' &
					CustomSchema.TypeCastErrorDetailOutput<this, NewType>
		  >

	// //

	NarrowInput<NewType extends this['Input']>(): DefineSchema<
		this,
		{ Input: NewType }
	>

	WidenInput<NewType>(): this['Input'] extends NewType
		? DefineSchema<this, { Input: NewType }>
		: Throw<
				'WidenInput: NewType is not supertype' &
					CustomSchema.TypeCastErrorDetailInput<this, NewType>
		  >

	CastInput<NewType>(): this['Input'] extends NewType
		? DefineSchema<this, { Input: NewType }>
		: NewType extends this['Input']
		? DefineSchema<this, { Input: NewType }>
		: Throw<
				'CastInput: NewType is not subtype or supertype' &
					CustomSchema.TypeCastErrorDetailInput<this, NewType>
		  >

	//

	//

	/**
	 * Validate `this` schema, throw on failure
	 *
	 * @param x - Value to validate against `this` schema
	 * @returns Value after applying fixes (e.g. defaults)
	 * @throws ValidationError
	 */

	validate(
		x: this[OPTIONS]['Input'] | AlsoAccept<unknown>,
		options?: Partial<ValidateOptions> | undefined,
	): this[OPTIONS]['Output']

	/**
	 * Best-effort fix - same as `exec(x).value`, but does not generate issues
	 * list
	 *
	 * - Can still throw if a custom fix throws
	 *
	 * @param x - Value to validate against `this` schema
	 * @returns Value after applying transformations (e.g. defaults)
	 */
	tryValidate<X>(
		x: X,
		options?: Partial<GetIssuesOptions> | undefined,
	): X | this[OPTIONS]['Output']

	/**
	 * Validate `this` schema, do not throw on failure
	 *
	 * @param x - Value to validate against `this` schema
	 * @returns `ValidationResult` - either success or error with issue list
	 */
	exec(
		x: this[OPTIONS]['Input'] | AlsoAccept<unknown>,
		options?: Partial<ValidateOptions> | undefined,
	): ValidationResult

	/**
	 * Check if `x` is already valid (without applying fixes)
	 *
	 * @param x - Value to validate against `this` schema, without applying fixes
	 */
	getIssues(
		x: this[OPTIONS]['Input'] | AlsoAccept<unknown>,
		options?: Partial<GetIssuesOptions> | undefined,
	): ValidationIssue[]

	/**
	 * Do not return transformed value - just check if the value is valid
	 * according to the schema (after applying fixes)
	 *
	 * @param x - Value to validate against `this` schema
	 */
	isFixable(
		x: this[OPTIONS]['Input'] | AlsoAccept<unknown>,
		options?: Partial<GetIssuesOptions> | undefined,
	): x is this[OPTIONS]['Input']

	/**
	 * Check if `x` is already valid (without applying fixes)
	 *
	 * @param x - Value to validate against `this` schema, without applying fixes
	 */
	isValid(
		x: this[OPTIONS]['Input'] | AlsoAccept<unknown>,
		options?: Partial<GetIssuesOptions> | undefined,
	): x is this[OPTIONS]['Output']

	//

	//

	/**
	 * Create union of this schema an one other schema
	 *
	 * - Alternatively, we can use global `or` function
	 *
	 * @inline
	 */
	or<Other extends $$Schemable>(
		other: Other,
	): SchemarOr<this, InferSchema<Other>>

	/**
	 * Create intersection of this schema an one other schema
	 *
	 * - Alternatively, we can use global `and` function
	 *
	 * @inline
	 */
	and<Other extends $$Schemable>(
		other: Other,
	): SchemarAnd<this, InferSchema<Other>>

	/**
	 * Simplify and flatten TS type
	 *
	 * - No-op at runtime (identity function)
	 * - Use `@voltiso/transform` to output simplified types in `*.d.ts` files
	 * - Useful when exporting from module - faster editor experience for lib
	 *   consumers
	 *
	 * @inline
	 */
	get simple(): SimplifySchema<this>
}

export namespace CustomSchema {
	export type CastResult<
		This extends $$Schema & { Output: unknown; Input: unknown },
		NewType,
		/** Added `_` for `SimpleSchema` assignability */
	> = _<This['Output']> | _<This['Input']> extends NewType
		? DefineSchema<This, { Output: NewType; Input: NewType }>
		: [NewType] extends [This['Output'] & This['Input']]
		? DefineSchema<This, { Output: NewType; Input: NewType }>
		: Throw<
				'Cast: NewType is not subtype or supertype' &
					TypeCastErrorDetail<This, NewType>
		  >

	/** @inline */
	export type WithDefault<This extends $$Schema, DefaultValue> = This extends {
		readonly [OPTIONS]: { readonly Output: unknown }
		readonly [PARTIAL_OPTIONS]: unknown
	}
		? GetSchemaByName<
				This[SCHEMA_NAME],
				Override<
					Omit<This[PARTIAL_OPTIONS], 'isOptional' | 'isStrictOptional'>,
					{
						hasDefault: true
						default: DefaultValue
						Output: Exclude<This[OPTIONS]['Output'], undefined>
					}
				>
		  >
		: // DefineSchema<
		  // 		This,
		  // 		{
		  // 			hasDefault: true
		  // 			default: DefaultValue
		  // 			Output: Exclude<This[OPTIONS]['Output'], undefined>
		  // 		}
		  //   >
		  never

	export type TypeCastErrorDetail<
		This extends { Output: unknown; Input: unknown },
		NewType,
	> = {
		NewType: NewType
		CurrentOutputType: This['Output']
		CurrentInputType: This['Input']
	}

	export type TypeCastErrorDetailOutput<
		This extends { Output: unknown },
		NewType,
	> = {
		NewType: NewType
		CurrentOutputType: This['Output']
	}

	export type TypeCastErrorDetailInput<
		This extends { Input: unknown },
		NewType,
	> = {
		NewType: NewType
		CurrentInputType: This['Input']
	}
}
