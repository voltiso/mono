// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { EXTENDS, SCHEMA_NAME } from '_'
import type {
	Assume,
	BASE_OPTIONS,
	DEFAULT_OPTIONS,
	NoThis,
} from '@voltiso/util'
import { lazyConstructor, noThis, OPTIONS } from '@voltiso/util'

import type {
	$$Schemable,
	$$SchemableTuple,
	CustomFunction,
	DefaultFunctionOptions,
	DefineSchema,
	FunctionOptions,
	IArray,
	Input_,
	ITuple,
	Output_,
	Schema,
	SchemaLike,
} from '~'
import {
	CustomSchemaImpl,
	isArraySchema,
	isFunctionSchema,
	isTupleSchema,
	isUnknownFunctionSchema,
} from '~'
import { infer, schema } from '~/core-schemas'
import { SchemarError } from '~/error'
import { ValidationIssue } from '~/meta-schemas'

import { _flattenUnion, or } from '../union'
import { _functionArgumentsExtends } from './_functionArgumentsExtends'

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomFunctionImpl<O> {
	readonly [BASE_OPTIONS]: FunctionOptions
	readonly [DEFAULT_OPTIONS]: DefaultFunctionOptions

	readonly Outer: this[OPTIONS]['Outer']
	readonly Inner: this[OPTIONS]['Inner']

	readonly OutputThis: Output_<this[OPTIONS]['this']>
	readonly InputThis: Input_<this[OPTIONS]['this']>
	readonly This: this['OutputThis']

	readonly OutputParameters: Assume<
		unknown[],
		Output_<this[OPTIONS]['parameters']>
	>
	readonly InputParameters: Assume<
		unknown[],
		Input_<this[OPTIONS]['parameters']>
	>
	readonly Parameters: this['OutputParameters']

	readonly OutputReturn: Output_<this[OPTIONS]['return']>
	readonly InputReturn: Input_<this[OPTIONS]['return']>
	readonly Return: this['OutputReturn']
}

export class CustomFunctionImpl<O extends Partial<FunctionOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomFunction<O>
{
	readonly [SCHEMA_NAME] = 'Function' as const

	get hasThis(): this[OPTIONS]['this'] extends NoThis ? false : true {
		// eslint-disable-next-line security/detect-object-injection
		return (this[OPTIONS].this !== noThis) as never
	}

	get getThisSchema(): never {
		// eslint-disable-next-line security/detect-object-injection
		return infer(this[OPTIONS].this) as never // ! infer in constructor instead?
	}

	get getParametersSchema(): never {
		// eslint-disable-next-line security/detect-object-injection
		return infer(this[OPTIONS].parameters) as never // ! infer in constructor instead?
	}

	get getReturnSchema(): never {
		// eslint-disable-next-line security/detect-object-injection
		return infer(this[OPTIONS].return) as never // ! infer in constructor instead?
	}

	constructor(o: FunctionOptions & O) {
		super(o)

		const parametersSchema = schema(
			// eslint-disable-next-line security/detect-object-injection
			this[OPTIONS].parameters as never,
		) as unknown as IArray | ITuple

		// eslint-disable-next-line etc/no-internal
		let parametersUnionSchemas = _flattenUnion(parametersSchema).getSchemas

		parametersUnionSchemas = parametersUnionSchemas.map(s => {
			if (isArraySchema(s)) {
				return s.mutableArray as never
			} else if (isTupleSchema(s)) {
				return s.mutableTuple as never
			} else {
				throw new SchemarError(
					'function: parameters schema should be array or tuple',
				)
			}
		})

		const finalArgumentsSchema =
			parametersUnionSchemas.length === 1
				? parametersUnionSchemas[0]
				: or(...parametersUnionSchemas)

		// eslint-disable-next-line security/detect-object-injection
		this[OPTIONS].parameters = finalArgumentsSchema as never
		// ! TODO - typings for parameters are incorrect
	}

	this<NewThis extends $$Schemable>(
		newThis: NewThis,
	): CustomFunction.WithThis<this, NewThis> {
		// eslint-disable-next-line security/detect-object-injection
		return new CustomFunctionImpl({ ...this[OPTIONS], this: newThis }) as never
	}

	parameters<NewParameters extends $$SchemableTuple>(
		parameters: NewParameters,
	): DefineSchema<this, { parameters: NewParameters }> {
		// eslint-disable-next-line security/detect-object-injection
		return new CustomFunctionImpl({ ...this[OPTIONS], parameters }) as never
	}

	return<NewReturn extends SchemaLike<any>>(
		newReturn: NewReturn,
	): DefineSchema<this, { return: NewReturn }> {
		return new CustomFunctionImpl({
			// eslint-disable-next-line security/detect-object-injection
			...this[OPTIONS],
			return: newReturn,
		}) as never
	}

	override [EXTENDS](other: SchemaLike): boolean {
		if (isUnknownFunctionSchema(other)) return true
		else if (isFunctionSchema(other)) {
			const argsOk: boolean = _functionArgumentsExtends(
				other.getParametersSchema as never,
				this.getParametersSchema,
			)

			const rOk = (this.getReturnSchema as unknown as Schema).extends(
				other.getReturnSchema as never,
			)

			return argsOk && rOk
			// eslint-disable-next-line security/detect-object-injection
		} else return super[EXTENDS](other)
	}

	override _getIssues(value: unknown): ValidationIssue[] {
		const issues: ValidationIssue[] = []

		if (typeof value !== 'function') {
			issues.push(
				new ValidationIssue({
					// eslint-disable-next-line security/detect-object-injection
					name: this[OPTIONS].name,
					expected: { description: 'be function' },
					received: { value },
				}),
			)
		}

		return issues
	}
}
