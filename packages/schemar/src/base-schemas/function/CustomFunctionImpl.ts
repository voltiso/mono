// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { EXTENDS, SCHEMA_NAME } from '_'
import type {
	Assume,
	BASE_OPTIONS,
	DEFAULT_OPTIONS,
	NoThis,
} from '@voltiso/util'
import { lazyConstructor, noThis, OPTIONS } from '@voltiso/util'

import { schema } from '~/core-schemas/schemaInferrer/SchemaInferrer'
import { SchemarError } from '~/error'
import { infer_ } from '~/infer/infer'
import { ValidationIssue } from '~/meta-schemas'
import { CustomSchemaImpl } from '~/Schema/detail/CustomSchemaImpl'
import type { Input_, Output_ } from '~/types/GetType/GetType'
import type { $$SchemableTuple } from '~/types/Inferable/Inferable'
import type { Schema, SchemaLike } from '~/types/Schema/ISchema'
import type { $$Schemable } from '~/types/Schemable/Schemable'

import type { IArray } from '../array/IArray'
import { isArraySchema } from '../array/isArray'
import { isTupleSchema } from '../tuple/isTuple'
import type { ITuple } from '../tuple/ITuple'
import { _flattenUnion, or } from '../union'
import { isUnknownFunctionSchema } from '../unknownFunction/IUnknownFunction'
import { _functionArgumentsExtends } from './_functionArgumentsExtends'
import type { CustomFunction } from './CustomFunction'
import type { FunctionOptions } from './FunctionOptions'
import { isFunctionSchema } from './isFunction'

// ! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomFunctionImpl<O> {
	readonly [BASE_OPTIONS]: FunctionOptions
	readonly [DEFAULT_OPTIONS]: FunctionOptions.Default

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

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CustomFunctionImpl<O extends Partial<FunctionOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomFunction<O>
{
	// eslint-disable-next-line es-x/no-class-instance-fields
	override readonly [SCHEMA_NAME] = 'Function' as const

	get hasThis(): [this[OPTIONS]['this']] extends [NoThis] ? false : true {
		return (this[OPTIONS].this !== noThis) as never
	}

	get getThisSchema(): never {
		if (this[OPTIONS].this === noThis) throw new Error('no this schema')

		return infer_(this[OPTIONS].this) as never // ! infer in constructor instead?
	}

	get getParametersSchema(): never {
		return infer_(this[OPTIONS].parameters) as never // ! infer in constructor instead?
	}

	get getReturnSchema(): never {
		return infer_(this[OPTIONS].return) as never // ! infer in constructor instead?
	}

	constructor(o: FunctionOptions & O) {
		super(o, { freeze: false })

		const parametersSchema = schema(
			this[OPTIONS].parameters as never,
		) as unknown as IArray | ITuple

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

		this[OPTIONS].parameters = finalArgumentsSchema as never
		// ! TODO - typings for parameters are incorrect

		Object.freeze(this[OPTIONS])

		Object.freeze(this)
	}

	this<NewThis extends $$Schemable>(newThis: NewThis): any {
		return new CustomFunctionImpl({ ...this[OPTIONS], this: newThis }) as never
	}

	parameters<NewParameters extends $$SchemableTuple>(
		parameters: NewParameters,
	): any {
		return new CustomFunctionImpl({ ...this[OPTIONS], parameters }) as never
	}

	return<NewReturn extends SchemaLike>(newReturn: NewReturn): any {
		return new CustomFunctionImpl({
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
		} else return super[EXTENDS](other)
	}

	override _getIssues(value: unknown): ValidationIssue[] {
		const issues: ValidationIssue[] = []

		if (typeof value !== 'function') {
			issues.push(
				new ValidationIssue({
					name: this[OPTIONS].name,
					expected: { description: 'be function' },
					received: { value },
				}),
			)
		}

		return issues
	}
}
