// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	$Override_,
	AlsoAccept,
	BASE_OPTIONS,
	DeepPartial_,
	DEFAULT_OPTIONS,
	NoArgument,
	NonStrictPartial,
	OPTIONS,
	Throw,
} from '@voltiso/util'

import type {
	$$Schema,
	$$Schemable,
	ImplicitInferSchema$,
	Input_,
	Output_,
	OverrideSchema$,
	OverrideSchema$WithOmit,
	Schema,
	SCHEMA_NAME,
	SchemaOptions,
	SchemarAnd,
	SchemarOr,
	ValidationIssue,
	ValidationOptions,
	ValidationResult,
} from '~'

//

export interface CustomSchema<O extends Partial<SchemaOptions> = {}>
	extends Schema {
	//
	readonly [SCHEMA_NAME]: string // SchemaName

	readonly [BASE_OPTIONS]: SchemaOptions
	readonly [DEFAULT_OPTIONS]: SchemaOptions.Default

	readonly [OPTIONS]: $Override_<this[DEFAULT_OPTIONS], O>

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

	//

	get isOptional(): this[OPTIONS]['isOptional']
	get isStrictOptional(): this[OPTIONS]['isStrictOptional']

	get isReadonly(): this[OPTIONS]['isReadonly']

	get hasDefault(): this[OPTIONS]['hasDefault']
	get getDefault(): this[OPTIONS]['hasDefault'] extends false
		? never
		: this[OPTIONS]['Output']

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
		options?: NonStrictPartial<ValidationOptions> | undefined,
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
		options?: NonStrictPartial<ValidationOptions> | undefined,
	): X | this[OPTIONS]['Output']

	/**
	 * Validate `this` schema, do not throw on failure
	 *
	 * @param x - Value to validate against `this` schema
	 * @returns `ValidationResult` - either success or error with issue list
	 */
	exec(
		x: this[OPTIONS]['Input'] | AlsoAccept<unknown>,
		options?: NonStrictPartial<ValidationOptions> | undefined,
	): ValidationResult

	/**
	 * Check if `x` is already valid (without applying fixes)
	 *
	 * @param x - Value to validate against `this` schema, without applying fixes
	 */
	getIssues(
		x: this[OPTIONS]['Input'] | AlsoAccept<unknown>,
		options?: NonStrictPartial<ValidationOptions> | undefined,
	): ValidationIssue[]

	/**
	 * Do not return transformed value - just check if the value is valid
	 * according to the schema (after applying fixes)
	 *
	 * @param x - Value to validate against `this` schema
	 */
	isFixable(
		x: this[OPTIONS]['Input'] | AlsoAccept<unknown>,
		options?: NonStrictPartial<ValidationOptions> | undefined,
	): x is this[OPTIONS]['Input']

	/**
	 * Do not return transformed value - just check if the value is valid
	 * according to the schema (after applying fixes)
	 *
	 * @param x - Value to validate against `this` schema
	 */
	assertFixable(
		x: this[OPTIONS]['Input'] | AlsoAccept<unknown>,
		options?: NonStrictPartial<ValidationOptions> | undefined,
	): asserts x is this[OPTIONS]['Input']

	/**
	 * Check if `x` is already valid (without applying fixes)
	 *
	 * @param x - Value to validate against `this` schema, without applying fixes
	 */
	isValid(
		x: this[OPTIONS]['Input'] | AlsoAccept<unknown>,
		options?: NonStrictPartial<ValidationOptions> | undefined,
	): x is this[OPTIONS]['Output']

	/**
	 * Check if `x` is already valid (without applying fixes)
	 *
	 * @param x - Value to validate against `this` schema, without applying fixes
	 * @throws ValidationError
	 */
	assertValid(
		x: this[OPTIONS]['Input'] | AlsoAccept<unknown>,
		options?: NonStrictPartial<ValidationOptions> | undefined,
	): asserts x is this[OPTIONS]['Output']
}

//

//

export interface CustomSchema$<O extends Partial<SchemaOptions>>
	extends CustomSchema<O> /* , Schema$ */ {
	//

	/**
	 * Get the non-builder version of `this` schema (builder version does not play
	 * well with type-checking assignability)
	 *
	 * - 🌿 Identity at runtime
	 * - Use `GetSchema$` for the reverse operation
	 *
	 * ! Please override
	 */
	get Final(): CustomSchema<O>

	//

	/**
	 * Define object property to be optional or undefined
	 *
	 * - Validation will remove `undefined` properties if `this` schema does not
	 *   accept `undefined` by itself
	 *
	 * @inline
	 */
	get optional(): OverrideSchema$WithOmit<
		this,
		O,
		{ isOptional: true },
		'isStrictOptional' | 'default' | 'hasDefault'
	>

	/**
	 * Same as `optional`, but does not auto-remove `undefined` properties
	 *
	 * - `undefined` in the input value is considered invalid (similar to
	 *   `exactOptionalPropertyTypes`)
	 * - Use if you differentiate between `undefined` and non-present properties
	 *
	 * @inline
	 */
	get strictOptional(): OverrideSchema$WithOmit<
		this,
		O,
		{ isStrictOptional: true },
		'isOptional' | 'default' | 'hasDefault'
	>

	/**
	 * Define object property to be `readonly`
	 *
	 * @inline
	 */
	get readonly(): OverrideSchema$<this, O, { isReadonly: true }>

	//

	/**
	 * Specify default value if the input value is `undefined`
	 *
	 * @inline
	 */
	default<
		DefaultValue extends
			| this[OPTIONS]['Input']
			| AlsoAccept<Readonly<this[OPTIONS]['Input']>>,
	>(
		value: DefaultValue,
	): CustomSchema.WithDefault<this, O, DefaultValue>

	/**
	 * Specify default value if the input value is `undefined`
	 *
	 * @inline
	 */
	default<
		DefaultValue extends
			| this[OPTIONS]['Input']
			| AlsoAccept<Readonly<this[OPTIONS]['Input']>>,
	>(
		// eslint-disable-next-line @typescript-eslint/unified-signatures
		getValue: () => DefaultValue,
	): CustomSchema.WithDefault<this, O, DefaultValue>

	//

	/** Specify name for nicer messages */
	name(name: string): this

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
	 * - ✅ conditionSchema is validated according to TS subtype rules, not
	 *   assignability - meaning schema is validated with onUnknownProperty:
	 *   'ignore'
	 * - Return `undefined` only if the value is already correct
	 * - ⚠️ Return exactly the same value if the value is already correct -
	 *   otherwise `.isValid` will incorrectly return `false`, as it uses
	 *   `Object.is` to check if value was already valid
	 * - ⚠️ Do not modify the input value
	 *
	 * @inline
	 */
	narrow<NarrowOutput extends this[OPTIONS]['Output']>(
		map: (value: this[OPTIONS]['Output']) => NarrowOutput, // | void,
	): OverrideSchema$<this, O, { Output: NarrowOutput }>

	narrowIf(
		condition: (value: this[OPTIONS]['Output']) => boolean,
		map: (value: this[OPTIONS]['Output']) => this[OPTIONS]['Output'], // | void | undefined,
	): this

	/**
	 * Push transformation applied after anything else
	 *
	 * - ✅ conditionSchema is validated according to TS subtype rules, not
	 *   assignability - meaning schema is validated with onUnknownProperty:
	 *   'ignore'
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
		map: (value: this[OPTIONS]['Output']) =>
			| NewOutput
			| (this[OPTIONS]['isOptional'] extends true
					? undefined // typeof deleteIt
					: this[OPTIONS]['isStrictOptional'] extends true
						? undefined // typeof deleteIt
						: never),
	): OverrideSchema$<this, O, { Output: NewOutput }>

	map<ConditionSchema extends $$Schemable, NewOutput>(
		conditionSchema: ConditionSchema,
		map: (value: Output_<ConditionSchema> & this[OPTIONS]['Output']) =>
			| NewOutput
			| (this[OPTIONS]['isOptional'] extends true
					? undefined // typeof deleteIt
					: this[OPTIONS]['isStrictOptional'] extends true
						? undefined // typeof deleteIt
						: never),
	): OverrideSchema$<this, O, { Output: NewOutput }>

	/**
	 * Narrow-only overload
	 *
	 * Prefer {@link narrowIf} directly for type-check performance
	 */
	mapIf(
		condition: (value: this[OPTIONS]['Output']) => boolean,
		map: (value: this[OPTIONS]['Output']) =>
			| this[OPTIONS]['Output']
			| (this[OPTIONS]['isOptional'] extends true
					? undefined // typeof deleteIt
					: this[OPTIONS]['isStrictOptional'] extends true
						? undefined // typeof deleteIt
						: never),
	): this

	mapIf<NewOutput>(
		condition: (value: this[OPTIONS]['Output']) => boolean,
		map: (value: this[OPTIONS]['Output']) =>
			| NewOutput
			| (this[OPTIONS]['isOptional'] extends true
					? undefined // typeof deleteIt
					: this[OPTIONS]['isStrictOptional'] extends true
						? undefined // typeof deleteIt
						: never),
	): CustomSchema.WithMapIf<this, O, NewOutput>

	//

	//

	/**
	 * Function-based condition are separated from schema-based conditions for
	 * faster type-checking
	 */
	fixIf<AdditionalInput>(
		conditionTypeGuard: (
			value: AdditionalInput | AlsoAccept<unknown>,
		) => value is AdditionalInput,
		fix: (value: AdditionalInput) =>
			| this[OPTIONS]['Input']
			| (this[OPTIONS]['isOptional'] extends true
					? undefined // typeof deleteIt
					: this[OPTIONS]['isStrictOptional'] extends true
						? undefined // typeof deleteIt
						: never),
	): CustomSchema.WithFix<this, O, AdditionalInput>

	fixIf<AdditionalInput = NoArgument>(
		conditionPredicate: (
			value: unknown, // AdditionalInput | AlsoAccept<unknown>,
		) => boolean,
		fix: (value: AdditionalInput) =>
			| this[OPTIONS]['Input']
			| (this[OPTIONS]['isOptional'] extends true
					? undefined // typeof deleteIt
					: this[OPTIONS]['isStrictOptional'] extends true
						? undefined // typeof deleteIt
						: never),
	): [AdditionalInput] extends [NoArgument]
		? Throw<'Missing explicit AdditionalInput type argument'>
		: CustomSchema.WithFix<this, O, AdditionalInput>

	/**
	 * Executed only if `wrongValueSchema` passes subtype-validation
	 *
	 * @example
	 *
	 * ```ts
	 * const timestamp = s.date.fix(s.string, value => new Date(value))
	 * ```
	 *
	 * - ✅ conditionSchema is validated according to TS subtype rules, not
	 *   assignability - meaning schema is validated with onUnknownProperty:
	 *   'ignore'
	 * - 💀 Return `undefined` to delete the value (if `isOptional`) - will throw if
	 *   not validated via parent object
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
		fix: (value: AdditionalInput) =>
			| DeepPartial_<this[OPTIONS]['Input']>
			| (this[OPTIONS]['isOptional'] extends true
					? undefined // typeof deleteIt
					: this[OPTIONS]['isStrictOptional'] extends true
						? undefined // typeof deleteIt
						: never),
	): AdditionalInput extends Partial<this[OPTIONS]['Input']>
		? this
		: CustomSchema.WithFix<this, O, AdditionalInput>

	fix<S extends $$Schemable>(
		conditionSchema: S,
		fix: (value: Output_<S>) =>
			| DeepPartial_<this[OPTIONS]['Input']>
			| (this[OPTIONS]['isOptional'] extends true
					? undefined // typeof deleteIt
					: this[OPTIONS]['isStrictOptional'] extends true
						? undefined // typeof deleteIt
						: never),
	): Input_<S> extends Partial<this[OPTIONS]['Input']>
		? this
		: CustomSchema.WithFix<this, O, Input_<S>>

	//

	fix<ConditionSchema extends $$Schemable>(
		conditionSchema: ConditionSchema,
		fix: (value: Output_<ConditionSchema>) =>
			| this[OPTIONS]['Input']
			| (this[OPTIONS]['isOptional'] extends true
					? undefined // typeof deleteIt
					: this[OPTIONS]['isStrictOptional'] extends true
						? undefined // typeof deleteIt
						: never),
	): CustomSchema.WithFix<this, O, Input_<ConditionSchema>>

	/**
	 * Manually decide if the fix should be applied
	 *
	 * ⚠️ Please provide `AdditionalInput` type argument
	 */
	fix<AdditionalInput = NoArgument>(
		fix: <Value extends AdditionalInput | AlsoAccept<unknown>>(
			value: Value,
		) =>
			| this[OPTIONS]['Input'] // | void | undefined
			| (this[OPTIONS]['isOptional'] extends true
					? undefined // typeof deleteIt
					: this[OPTIONS]['isStrictOptional'] extends true
						? undefined // typeof deleteIt
						: never), // Value extends AdditionalInput ? this[OPTIONS]['Input'] : void,
	): [AdditionalInput] extends [NoArgument]
		? Throw<'Missing explicit AdditionalInput type argument'>
		: CustomSchema.WithFix<this, O, AdditionalInput>

	/** Same as `.fix`, but does not extend the `Input` type */
	implicitFix<AdditionalInput>(
		conditionSchema: $$Schema & {
			Output: AdditionalInput
			Input: AdditionalInput
		},
		fix: (value: AdditionalInput) =>
			| DeepPartial_<this[OPTIONS]['Input']>
			| (this[OPTIONS]['isOptional'] extends true
					? undefined // typeof deleteIt
					: this[OPTIONS]['isStrictOptional'] extends true
						? undefined // typeof deleteIt
						: never),
	): this

	/** Same as `.fix`, but does not extend the `Input` type */
	implicitFix<S extends $$Schemable>(
		conditionSchema: S,
		fix: (value: Output_<S>) =>
			| DeepPartial_<this[OPTIONS]['Input']>
			| (this[OPTIONS]['isOptional'] extends true
					? undefined // typeof deleteIt
					: this[OPTIONS]['isStrictOptional'] extends true
						? undefined // typeof deleteIt
						: never),
	): this

	//

	/**
	 * Same as `.map(() => undefined).optional`
	 *
	 * - Output value will always be deleted (or `undefined`) - use `.fix` to access
	 *   the value before the deletion and do something with it
	 */
	get deleted(): OverrideSchema$WithOmit<
		this,
		O,
		{ Output: undefined; isOptional: true },
		'isStrictOptional' | 'default' | 'hasDefault'
	>

	//

	/**
	 * Cast both Output and Input - either use types from a provided other schema,
	 * or set both Input and Output to `T`
	 */
	Cast<T extends $$Schema | AlsoAccept<unknown>>(): CustomSchema.WithCast<
		this,
		O,
		T
	>

	/** Distributive version of {@link Cast} - if you need it */
	$Cast<T extends $$Schema | AlsoAccept<unknown>>(): T extends any
		? CustomSchema.WithCast<this, O, T>
		: never

	//

	Narrow<T extends this['Input'] & this['Output']>(): OverrideSchema$<
		this,
		O,
		{ Output: T; Input: T }
	>

	$Narrow<T extends this['Input'] & this['Output']>(): T extends any
		? OverrideSchema$<this, O, { Output: T; Input: T }>
		: never

	//

	Widen<T>(): CustomSchema.WithWiden<this, O, T>
	$Widen<T>(): T extends any ? CustomSchema.WithWiden<this, O, T> : never

	//

	NarrowOutput<NewType extends this['Output']>(): OverrideSchema$<
		this,
		O,
		{ Output: NewType }
	>

	/** Distributive version of {@link NarrowOutput} - if you need it */
	$NarrowOutput<NewType extends this['Output']>(): NewType extends any
		? OverrideSchema$<this, O, { Output: NewType }>
		: never

	//

	WidenOutput<NewType>(): CustomSchema.WithWidenOutput<this, O, NewType>

	/** Distributive version of {@link WidenOutput} - if you need it */
	$WidenOutput<NewType>(): NewType extends any
		? CustomSchema.WithWidenOutput<this, O, NewType>
		: never

	CastOutput<NewType>(): OverrideSchema$<this, O, { Output: NewType }>

	/** Distributive version of {@link CastOutput} - if you need it */
	$CastOutput<NewType>(): NewType extends any
		? OverrideSchema$<this, O, { Output: NewType }>
		: never

	//

	NarrowInput<NewType extends this['Input']>(): OverrideSchema$<
		this,
		O,
		{ Input: NewType }
	>

	/** Distributive version of {@link NarrowInput} - if you need it */
	$NarrowInput<NewType extends this['Input']>(): NewType extends any
		? OverrideSchema$<this, O, { Input: NewType }>
		: never

	WidenInput<NewType>(): CustomSchema.WithWidenInput<this, O, NewType>

	/** Distributive version of {@link WidenInput} - if you need it */
	$WidenInput<NewType>(): NewType extends any
		? CustomSchema.WithWidenInput<this, O, NewType>
		: never

	CastInput<NewType>(): OverrideSchema$<this, O, { Input: NewType }>

	/** Distributive version of {@link CastInput} - if you need it */
	$CastInput<NewType>(): NewType extends any
		? OverrideSchema$<this, O, { Input: NewType }>
		: never

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
	): SchemarOr<this, ImplicitInferSchema$<Other>>

	/**
	 * Create intersection of this schema an one other schema
	 *
	 * - Alternatively, we can use global `and` function
	 *
	 * @inline
	 */
	and<Other extends $$Schemable>(
		other: Other,
	): SchemarAnd<this, ImplicitInferSchema$<Other>>

	toString(): string
}

export declare namespace CustomSchema {
	export type WithFix<
		This extends $$Schema,
		O,
		AdditionalInput,
	> = This extends { readonly Input: unknown }
		? OverrideSchema$<This, O, { Input: This['Input'] | AdditionalInput }>
		: never

	export type WithMapIf<
		This extends $$Schema,
		O,
		AdditionalOutput,
	> = This extends { readonly Output: unknown }
		? AdditionalOutput extends This['Output']
			? This
			: OverrideSchema$<This, O, { Output: This['Output'] | AdditionalOutput }>
		: never

	export type WithCast<This extends $$Schema, O, T> = [T] extends [
		$$Schema & {
			readonly Output: unknown
			readonly Input: unknown
		},
	]
		? OverrideSchema$<This, O, { Output: T['Output']; Input: T['Input'] }>
		: OverrideSchema$<This, O, { Output: T; Input: T }>

	export type WithWiden<
		This extends $$Schema & {
			readonly Input: unknown
			readonly Output: unknown
		},
		O,
		T,
	> = This['Input'] extends T
		? This['Output'] extends T
			? OverrideSchema$<This, O, { Output: T; Input: T }>
			: Throw<'T not a supertype of Output' & { T: T }>
		: Throw<'T not a supertype of Input' & { T: T }>

	export type WithWidenOutput<
		This extends $$Schema & { readonly Output: unknown },
		O,
		NewType,
	> = This['Output'] extends NewType
		? OverrideSchema$<This, O, { Output: NewType }>
		: Throw<
				'WidenOutput: NewType is not supertype' &
					TypeCastErrorDetailOutput<This, NewType>
			>

	export type WithWidenInput<
		This extends $$Schema & { readonly Input: unknown },
		O,
		NewType,
	> = This['Input'] extends NewType
		? OverrideSchema$<This, O, { Input: NewType }>
		: Throw<
				'WidenInput: NewType is not supertype' &
					TypeCastErrorDetailInput<This, NewType>
			>

	/** @inline */
	export type WithDefault<
		This extends $$Schema,
		O extends object,
		DefaultValue,
	> = This extends {
		readonly Output: unknown
		// readonly isReadonlyArray?: unknown
		// readonly isReadonlyTuple?: unknown
	}
		? OverrideSchema$WithOmit<
				This,
				O,
				{
					hasDefault: true

					// default: This extends
					// 	| { readonly isReadonlyArray: true }
					// 	| { readonly isReadonlyTuple: true }
					// 	? Readonly<DefaultValue>
					// 	: This extends
					// 			| { readonly isReadonlyArray: true }
					// 			| { readonly isReadonlyTuple: true }
					// 	? Mutable_<DefaultValue>
					// 	: DefaultValue

					Output: Exclude<This['Output'], undefined>
				},
				'isOptional' | 'isStrictOptional'
			>
		: never

	export interface TypeCastErrorDetail<
		This extends { Output: unknown; Input: unknown },
		NewType,
	> {
		NewType: NewType
		CurrentOutputType: This['Output']
		CurrentInputType: This['Input']
	}

	export interface TypeCastErrorDetailOutput<
		This extends { Output: unknown },
		NewType,
	> {
		NewType: NewType
		CurrentOutputType: This['Output']
	}

	export interface TypeCastErrorDetailInput<
		This extends { Input: unknown },
		NewType,
	> {
		NewType: NewType
		CurrentInputType: This['Input']
	}
}
