// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	CustomFunction,
	DefaultFunctionOptions,
	FunctionOptions,
	IArray,
	Input_,
	ITuple,
	Output_,
	Schema,
	SchemaLike,
} from '@voltiso/schemar.types'
import {
	EXTENDS,
	isArray,
	isTuple,
	isUnknownFunction,
	SCHEMA_NAME,
} from '@voltiso/schemar.types'
import * as t from '@voltiso/schemar.types'
import type { BASE_OPTIONS, DEFAULT_OPTIONS, NoThis } from '@voltiso/util'
import { lazyConstructor, noThis, OPTIONS } from '@voltiso/util'

import { infer, schema } from '~/core-schemas'
import { SchemarError } from '~/error'
import { ValidationIssue } from '~/meta-schemas'
import { CustomSchemaImpl } from '~/Schema'

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

	readonly OutputParameters: Output_<this[OPTIONS]['parameters']>
	readonly InputParameters: Input_<this[OPTIONS]['parameters']>
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

	get getThisSchema(): this[OPTIONS]['this'] {
		// eslint-disable-next-line security/detect-object-injection
		return infer(this[OPTIONS].this) as never // ! infer in constructor instead?
	}

	get getParametersSchema(): this[OPTIONS]['parameters'] {
		// eslint-disable-next-line security/detect-object-injection
		return infer(this[OPTIONS].parameters) as never // ! infer in constructor instead?
	}

	get getReturnSchema(): this[OPTIONS]['return'] {
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
			if (isArray(s)) {
				return s.mutableArray as never
			} else if (isTuple(s)) {
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

	this<NewThis extends t.$$Schemable>(
		newThis: NewThis,
	): t.CustomFunction.WithThis<this, NewThis> {
		// eslint-disable-next-line security/detect-object-injection
		return new CustomFunctionImpl({ ...this[OPTIONS], this: newThis }) as never
	}

	parameters<NewParameters extends t.$$SchemableTuple>(
		parameters: NewParameters,
	): t.DefineSchema<this, { parameters: NewParameters }> {
		// eslint-disable-next-line security/detect-object-injection
		return new CustomFunctionImpl({ ...this[OPTIONS], parameters }) as never
	}

	return<NewReturn extends SchemaLike<any>>(
		newReturn: NewReturn,
	): t.DefineSchema<this, { return: NewReturn }> {
		return new CustomFunctionImpl({
			// eslint-disable-next-line security/detect-object-injection
			...this[OPTIONS],
			return: newReturn,
		}) as never
	}

	override [EXTENDS](other: SchemaLike): boolean {
		if (isUnknownFunction(other)) return true
		else if (t.isFunction(other)) {
			const argsOk: boolean = _functionArgumentsExtends(
				other.getParametersSchema as never,
				this.getParametersSchema as never,
			)

			const rOk = (this.getReturnSchema as unknown as Schema).extends(
				other.getReturnSchema as never,
			)

			return argsOk && rOk
			// eslint-disable-next-line security/detect-object-injection
		} else return super[EXTENDS](other)
	}

	override _getIssues(x: unknown): ValidationIssue[] {
		const issues: ValidationIssue[] = []

		if (typeof x !== 'function') {
			issues.push(
				new ValidationIssue({
					// eslint-disable-next-line security/detect-object-injection
					name: this[OPTIONS].name,
					expectedDescription: 'be function',
					received: x,
				}),
			)
		}

		return issues
	}
}
