// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ValidationResult } from '../s/validation/validationResult'
import { EXTENDS } from './_/symbols.js'
import type { Schemable } from './Schemable.js'
import type { OPTIONS, SchemaOptions } from './SchemaOptions.js'

export const IS_SCHEMA = Symbol('IS_SCHEMA')
export type IS_SCHEMA = typeof IS_SCHEMA

/**
 * Every Schema is assignable to `ISchema`
 *
 * - Also, every `ISchema<...>` is assignable to `ISchema` (with default template params)
 */
export interface ISchema<O extends SchemaOptions = SchemaOptions> {
	readonly [IS_SCHEMA]: true
	readonly [OPTIONS]: O

	/**
	 * Type-only (no value at runtime)
	 *
	 * - Get the type using `typeof xxx.Type`
	 * - Alias to `.Out`
	 */
	get Type(): O['_out']

	/**
	 * Inferred Type (output - after fixing)
	 *
	 * - Get the type using `typeof xxx.Out`
	 * - Type-only (no value at runtime)
	 */
	get OutputType(): O['_out']

	/**
	 * Inferred Input Type (the schema is able to convert these into Output Type)
	 *
	 * - Get the type using `typeof xxx.In`
	 * - Type-only (no value at runtime)
	 */
	get InputType(): O['_in']

	get isOptional(): O['isOptional']
	get isReadonly(): O['isReadonly']

	get hasDefault(): O['hasDefault']
	get getDefault(): O['hasDefault'] extends false ? never : O['_out']

	get optional(): ISchema
	get readonly(): ISchema
	default(value: unknown): ISchema

	extends(other: Schemable): boolean
	[EXTENDS](other: ISchema): boolean

	check(
		checkIfValid: (x: this['InputType']) => boolean,
		expectedDescription?: string | ((x: this['InputType']) => string),
	): this

	/**
	 * Validate `this` schema, do not throw on failure
	 *
	 * @param x - Value to validate against `this` schema
	 * @returns `ValidationResult` - either success or error with issue list
	 */
	tryValidate(x: unknown): ValidationResult<this['OutputType']>

	/**
	 * Validate `this` schema, throw on failure
	 *
	 * @param x - Value to validate against `this` schema
	 * @returns Value after applying transformations (e.g. defaults)
	 * @throws ValidationError
	 */
	validate(x: unknown): this['OutputType']

	/**
	 * Do not return transformed value - just check if the value is valid
	 * according to the schema
	 *
	 * @param x - Value to validate against `this` schema
	 */
	isValid(x: unknown): x is this['OutputType']

	toString(): string
}

export function isSchema(x: unknown): x is ISchema {
	// eslint-disable-next-line security/detect-object-injection
	return Boolean((x as ISchema | null)?.[IS_SCHEMA])
}
