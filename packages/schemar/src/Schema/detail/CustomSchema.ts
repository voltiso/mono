// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Assume, VRequired } from '@voltiso/util'

import type {
	DefineSchema,
	MergeSchemaOptions,
	SCHEMA_NAME,
	Schemable,
	SchemaName,
	SchemaOptions,
} from '~'

import type { ISchema } from './ISchema'
import type {
	BASE_OPTIONS,
	DEFAULT_OPTIONS,
	OPTIONS,
	PARTIAL_OPTIONS,
} from './symbols'
import { EXTENDS } from './symbols'

export interface CustomSchema<O extends Partial<SchemaOptions>>
	extends ISchema {
	//
	readonly [SCHEMA_NAME]: SchemaName

	readonly [BASE_OPTIONS]: SchemaOptions

	readonly [PARTIAL_OPTIONS]: VRequired<O>
	readonly [DEFAULT_OPTIONS]: this[BASE_OPTIONS]

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
	): DefineSchema<this, DefaultOptions<this, DefaultValue>>

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

	// or<Other extends ISchema>(other: Other): Union<[this, Other]>
}

type DefaultOptions<This extends ISchema, DefaultValue> = {
	hasDefault: true
	default: DefaultValue
	Output: Exclude<This[OPTIONS]['Output'], undefined>
}
