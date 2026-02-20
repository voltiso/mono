// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** biome-ignore-all lint/suspicious/noExplicitAny: . */

import type { Assume } from '@voltiso/util'
import { $fastAssert, lazyConstructor, OPTIONS, UNSET } from '@voltiso/util'
import { EXTENDS, SCHEMA_NAME } from '_'

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
import type { ITuple } from '../tuple/ITuple'
import { isTupleSchema } from '../tuple/isTuple'
import { _flattenUnion, or } from '../union'
import { isUnknownFunctionSchema } from '../unknownFunction/IUnknownFunction'
import { _functionArgumentsExtends } from './_functionArgumentsExtends'
import type { CustomFunction } from './CustomFunction'
import type { FunctionOptions } from './FunctionOptions'
import { isFunctionSchema } from './isFunction'

$fastAssert(SCHEMA_NAME)
$fastAssert(EXTENDS)
$fastAssert(UNSET)
$fastAssert(OPTIONS)

// ! esbuild bug: Cannot `declare` inside class - using interface merging instead
// biome-ignore lint/correctness/noUnusedVariables: .
export interface CustomFunctionImpl<O> {
	readonly [Voltiso.BASE_OPTIONS]: FunctionOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: FunctionOptions.Default

	readonly Outer: this[Voltiso.OPTIONS]['Outer']
	readonly Inner: this[Voltiso.OPTIONS]['Inner']

	readonly OutputThis: Output_<this[Voltiso.OPTIONS]['this']>
	readonly InputThis: Input_<this[Voltiso.OPTIONS]['this']>
	readonly This: this['OutputThis']

	readonly OutputParameters: Assume<
		unknown[],
		Output_<this[Voltiso.OPTIONS]['parameters']>
	>
	readonly InputParameters: Assume<
		unknown[],
		Input_<this[Voltiso.OPTIONS]['parameters']>
	>
	readonly Parameters: this['OutputParameters']

	readonly OutputReturn: Output_<this[Voltiso.OPTIONS]['return']>
	readonly InputReturn: Input_<this[Voltiso.OPTIONS]['return']>
	readonly Return: this['OutputReturn']
}

// biome-ignore lint/suspicious/noUnsafeDeclarationMerging: .
export class CustomFunctionImpl<O extends Partial<FunctionOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomFunction<O>
{
	override readonly [Voltiso.Schemar.SCHEMA_NAME] = 'Function' as const

	get hasThis(): [this[Voltiso.OPTIONS]['this']] extends [UNSET]
		? false
		: true {
		return (this[Voltiso.OPTIONS].this !== UNSET) as never
	}

	get getThisSchema(): never {
		if (this[Voltiso.OPTIONS].this === UNSET) throw new Error('no this schema')

		return infer_(this[Voltiso.OPTIONS].this) as never // ! infer in constructor instead?
	}

	get getParametersSchema(): never {
		return infer_(this[Voltiso.OPTIONS].parameters) as never // ! infer in constructor instead?
	}

	get getReturnSchema(): never {
		return infer_(this[Voltiso.OPTIONS].return) as never // ! infer in constructor instead?
	}

	constructor(o: FunctionOptions & O) {
		super(o, { freeze: false })

		const parametersSchema = schema(
			this[Voltiso.OPTIONS].parameters as never,
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

		this[Voltiso.OPTIONS].parameters = finalArgumentsSchema as never
		// ! TODO - typings for parameters are incorrect

		Object.freeze(this[Voltiso.OPTIONS])

		Object.freeze(this)
	}

	this<NewThis extends $$Schemable>(newThis: NewThis): any {
		return new CustomFunctionImpl({
			...this[Voltiso.OPTIONS],
			this: newThis,
		}) as never
	}

	parameters<NewParameters extends $$SchemableTuple>(
		parameters: NewParameters,
	): any {
		return new CustomFunctionImpl({
			...this[Voltiso.OPTIONS],
			parameters,
		}) as never
	}

	return<NewReturn extends SchemaLike>(newReturn: NewReturn): any {
		return new CustomFunctionImpl({
			...this[Voltiso.OPTIONS],
			return: newReturn,
		}) as never
	}

	override [Voltiso.Schemar.EXTENDS](other: SchemaLike): boolean {
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
		} else return super[Voltiso.Schemar.EXTENDS](other)
	}

	override _getIssues(value: unknown): ValidationIssue[] {
		const issues: ValidationIssue[] = []

		if (typeof value !== 'function') {
			issues.push(
				new ValidationIssue({
					name: this[Voltiso.OPTIONS].name,
					expected: { description: 'be function' },
					received: { value },
				}),
			)
		}

		return issues
	}
}
