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
	IsCompatible,
	IsIdentical,
	Throw,
} from '@voltiso/util'

import type {
	DefaultSchemaOptions,
	DefineSchema,
	MergeSchemaOptions,
	SchemableLike,
	SchemaOptions,
	SimpleSchema,
	Union,
	ValidationIssue,
	ValidationResult,
} from '~'
import type { ISchema, SchemaLike } from '~/Schema'

export type $CustomSchema<O extends Partial<SchemaOptions> = {}> = O extends any
	? CustomSchema<O>
	: never

export interface CustomSchema<O extends Partial<SchemaOptions> = {}>
	extends ISchema,
		SchemaLike {
	//
	readonly [SCHEMA_NAME]: string // SchemaName

	readonly [BASE_OPTIONS]: SchemaOptions

	readonly [DEFAULT_OPTIONS]: DefaultSchemaOptions

	readonly [PARTIAL_OPTIONS]: O

	readonly [OPTIONS]: MergeSchemaOptions<
		this[DEFAULT_OPTIONS],
		this[PARTIAL_OPTIONS]
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
	[EXTENDS](other: SchemaLike): boolean

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
	default<DefaultValue extends this[OPTIONS]['Input']>(
		value: DefaultValue,
	): WithDefault<this, DefaultValue>

	/**
	 * Specify default value if the input value is `undefined`
	 *
	 * @inline
	 */
	default<DefaultValue extends this[OPTIONS]['Input']>(
		getValue: () => DefaultValue,
	): WithDefault<this, DefaultValue>

	//

	/** @inline */
	check(
		checkIfValid: (x: this[OPTIONS]['Input']) => boolean,
		expectedDescription?: string | ((x: this[OPTIONS]['Input']) => string),
	): this

	/** @inline */
	fix<Out extends this[OPTIONS]['Output']>(
		fixFunc: (x: this[OPTIONS]['Input']) => Out | void,
	): DefineSchema<this, { Output: Out }>

	//

	//

	Narrow<
		// eslint-disable-next-line etc/no-misused-generics
		NewType extends this['OutputType'] & this['InputType'],
	>(): DefineSchema<this, { Output: NewType; Input: NewType }>

	// eslint-disable-next-line etc/no-misused-generics
	Widen<NewType>(): this['OutputType'] | this['InputType'] extends NewType
		? DefineSchema<this, { Output: NewType; Input: NewType }>
		: Throw<
				'Widen: NewType is not supertype' & TypeCastErrorDetail<this, NewType>
		  >

	// eslint-disable-next-line etc/no-misused-generics
	Cast<NewType>(): this['OutputType'] | this['InputType'] extends NewType
		? DefineSchema<this, { Output: NewType; Input: NewType }>
		: NewType extends this['OutputType'] & this['InputType']
		? DefineSchema<this, { Output: NewType; Input: NewType }>
		: Throw<
				'Cast: NewType is not subtype or supertype' &
					TypeCastErrorDetail<this, NewType>
		  >

	//

	NarrowOutput<
		// eslint-disable-next-line etc/no-misused-generics
		NewType extends this['OutputType'],
	>(): DefineSchema<this, { Output: NewType }>

	// eslint-disable-next-line etc/no-misused-generics
	WidenOutput<NewType>(): this['OutputType'] extends NewType
		? DefineSchema<this, { Output: NewType }>
		: Throw<
				'WidenOutput: NewType is not supertype' &
					TypeCastErrorDetailOutput<this, NewType>
		  >

	// eslint-disable-next-line etc/no-misused-generics
	CastOutput<NewType>(): this['OutputType'] extends NewType
		? DefineSchema<this, { Output: NewType }>
		: NewType extends this['OutputType']
		? DefineSchema<this, { Output: NewType }>
		: Throw<
				'CastOutput: NewType is not subtype or supertype' &
					TypeCastErrorDetailOutput<this, NewType>
		  >

	//

	NarrowInput<
		// eslint-disable-next-line etc/no-misused-generics
		NewType extends this['InputType'],
	>(): DefineSchema<this, { Input: NewType }>

	// eslint-disable-next-line etc/no-misused-generics
	WidenInput<NewType>(): this['InputType'] extends NewType
		? DefineSchema<this, { Input: NewType }>
		: Throw<
				'WidenInput: NewType is not supertype' &
					TypeCastErrorDetailInput<this, NewType>
		  >

	// eslint-disable-next-line etc/no-misused-generics
	CastInput<NewType>(): this['InputType'] extends NewType
		? DefineSchema<this, { Input: NewType }>
		: NewType extends this['InputType']
		? DefineSchema<this, { Input: NewType }>
		: Throw<
				'CastInput: NewType is not subtype or supertype' &
					TypeCastErrorDetailInput<this, NewType>
		  >

	//

	//

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
	 * Best-effort fix - same as `exec(x).value`, but does not generate issues
	 * list
	 *
	 * @param x - Value to validate against `this` schema
	 * @returns Value after applying transformations (e.g. defaults)
	 */
	tryValidate<X>(x: X): X | this[OPTIONS]['Output']

	/**
	 * Validate `this` schema, do not throw on failure
	 *
	 * @param x - Value to validate against `this` schema
	 * @returns `ValidationResult` - either success or error with issue list
	 */
	exec(x: this[OPTIONS]['Input'] | AlsoAccept<unknown>): ValidationResult

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
	or<Other extends SchemableLike>(other: Other): Union<[this, Other]>

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
	get simple(): Simplify<this>
}

/** @inline */
export type CanBeSimpleSchema<
	S extends {
		OutputType: any
		InputType: any
		[OPTIONS]: any
	},
	True = true,
	False = false,
> = true extends S[OPTIONS]['isOptional']
	? False
	: true extends S[OPTIONS]['isReadonly']
	? False
	: false extends IsCompatible<S['OutputType'], S['InputType']>
	? False
	: True

/** @inline */
export type Simplify<
	This extends {
		OutputType: any
		InputType: any
		[OPTIONS]: any
	},
> = SchemaLike<never> extends This
	? This
	: ISchema<never> extends This
	? This
	: CanBeSimpleSchema<This> extends true
	? SimpleSchema<This[OPTIONS]['Output']>
	: CustomSchema<
			_<
				(This[OPTIONS]['isOptional'] extends false
					? {}
					: { isOptional: This[OPTIONS]['isOptional'] }) &
					(This[OPTIONS]['isReadonly'] extends false
						? {}
						: { isReadonly: This[OPTIONS]['isReadonly'] }) &
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

/** @inline */
export type WithDefault<This, DefaultValue> = This extends {
	readonly [OPTIONS]: { readonly Output: unknown }
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

export type TypeCastErrorDetail<
	This extends { OutputType: any; InputType: any },
	NewType,
> = {
	NewType: NewType
	CurrentOutputType: This['OutputType']
	CurrentInputType: This['InputType']
}

export type TypeCastErrorDetailOutput<
	This extends { OutputType: any },
	NewType,
> = {
	NewType: NewType
	CurrentOutputType: This['OutputType']
}

export type TypeCastErrorDetailInput<
	This extends { InputType: any },
	NewType,
> = {
	NewType: NewType
	CurrentInputType: This['InputType']
}
