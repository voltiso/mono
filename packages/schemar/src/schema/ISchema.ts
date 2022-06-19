import { ValidationResult } from '../s/validation/validationResult'
import { Schemable } from './Schemable'
import { OPTIONS, SchemaOptions } from './SchemaOptions'
import { EXTENDS } from './_/symbols'

export const IS_SCHEMA = Symbol('IS_SCHEMA')
export type IS_SCHEMA = typeof IS_SCHEMA

/**
 * Every Schema is assignable to `ISchema`
 *  - Also, every `ISchema<...>` is assignable to `ISchema` (with default template params)
 */
export interface ISchema<O extends SchemaOptions = SchemaOptions> {
	readonly [IS_SCHEMA]: true
	readonly [OPTIONS]: O

	/**
	 * Type-only (no value at runtime)
	 *  - Get the type using `typeof xxx.Type`
	 *  - Alias to `.Out`
	 * */
	get Type(): O['_out']

	/**
	 * Inferred Type (output - after fixing)
	 *  - Get the type using `typeof xxx.Out`
	 *  - Type-only (no value at runtime)
	 * */
	get OutputType(): O['_out']

	/**
	 * Inferred Input Type (the schema is able to convert these into Output Type)
	 *  - Get the type using `typeof xxx.In`
	 *  - Type-only (no value at runtime)
	 * */
	get InputType(): O['_in']

	get isOptional(): O['optional']
	get isReadonly(): O['readonly']
	get getDefault(): O['default']

	get optional(): ISchema
	get readonly(): ISchema
	default(value: unknown): ISchema

	extends(other: Schemable): boolean
	[EXTENDS](other: ISchema): boolean

	check(
		checkIfValid: (x: this['InputType']) => boolean,
		expectedDescription?: string | ((x: this['InputType']) => string)
	): this

	tryValidate(x: unknown): ValidationResult<this['OutputType']>
	validate(x: unknown): this['OutputType']
	isValid(x: unknown): x is this['OutputType']

	toString(): string
}

export function isSchema(x: unknown): x is ISchema {
	return !!(x as ISchema | null)?.[IS_SCHEMA]
}
