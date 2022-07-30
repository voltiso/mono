// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Assume } from '@voltiso/util'

import type {
	DefineSchema,
	MergeSchemaOptions,
	Schemable,
	SchemaOptions,
	Union,
	ValidationResult,
} from '~'

import type { ISchema, SCHEMA_NAME } from './ISchema'
import type {
	BASE_OPTIONS,
	DEFAULT_OPTIONS,
	OPTIONS,
	PARTIAL_OPTIONS,
} from './symbols'
import { EXTENDS } from './symbols'

export interface CustomSchema<O extends Partial<SchemaOptions> = {}> {
	//
	readonly [SCHEMA_NAME]: string // SchemaName

	readonly [BASE_OPTIONS]: SchemaOptions

	readonly [DEFAULT_OPTIONS]: this[BASE_OPTIONS]

	readonly [PARTIAL_OPTIONS]: O

	// [OPTIONS]: this[BASE_OPTIONS]

	readonly [OPTIONS]: Assume<
		this[BASE_OPTIONS],
		MergeSchemaOptions<this[DEFAULT_OPTIONS], this[PARTIAL_OPTIONS]>
	>

	get Type(): this[OPTIONS]['Output']
	get OutputType(): this[OPTIONS]['Output']
	get InputType(): this[OPTIONS]['Input']

	get isOptional(): this[OPTIONS]['isOptional']
	get isReadonly(): this[OPTIONS]['isReadonly']

	get hasDefault(): this[OPTIONS]['hasDefault']
	get getDefault(): this[OPTIONS]['hasDefault'] extends false
		? never
		: this[OPTIONS]['Output']

	extends(other: Schemable): boolean
	[EXTENDS](other: ISchema): boolean

	// builder

	get optional(): DefineSchema<this, { isOptional: true }>
	get readonly(): DefineSchema<this, { isReadonly: true }>

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
	tryValidate(x: unknown): ValidationResult

	/**
	 * Validate `this` schema, throw on failure
	 *
	 * @param x - Value to validate against `this` schema
	 * @returns Value after applying transformations (e.g. defaults)
	 * @throws ValidationError
	 */
	validate(x: unknown): unknown
	// validate<X>(
	// 	x: X,
	// ): X extends this[OPTIONS]['Input'] ? this[OPTIONS]['Output'] : never

	/**
	 * Do not return transformed value - just check if the value is valid
	 * according to the schema
	 *
	 * @param x - Value to validate against `this` schema
	 */
	isValid(x: unknown): x is this[OPTIONS]['Output']
	// isValid(x: unknown): boolean

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
