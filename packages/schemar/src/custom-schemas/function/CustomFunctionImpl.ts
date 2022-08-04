// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import {
	type BASE_OPTIONS,
	type DEFAULT_OPTIONS,
	type PARTIAL_OPTIONS,
	EXTENDS,
	OPTIONS,
	SCHEMA_NAME,
} from '_'
import type { Assume } from '@voltiso/util'
import { lazyConstructor } from '@voltiso/util'

import type {
	CustomFunction,
	DefaultFunctionOptions,
	FunctionOptions,
	IArray,
	ISchema,
	ITuple,
	MergeSchemaOptions,
} from '~'
import {
	_functionArgumentsExtends,
	CustomSchemaImpl,
	isArray,
	isFunction,
	isTuple,
	isUnknownFunction,
	schema,
	SchemarError,
	ValidationIssue,
} from '~'

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomFunctionImpl<O> {
	readonly [BASE_OPTIONS]: FunctionOptions
	readonly [DEFAULT_OPTIONS]: DefaultFunctionOptions

	readonly [PARTIAL_OPTIONS]: O

	readonly [OPTIONS]: Assume<
		FunctionOptions,
		MergeSchemaOptions<DefaultFunctionOptions, O>
	>
}

export class CustomFunctionImpl<O extends Partial<FunctionOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomFunction<O>
{
	readonly [SCHEMA_NAME] = 'Function' as const

	get getArgumentsSchema(): this[OPTIONS]['arguments'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].arguments as never
	}

	get getResultSchema(): this[OPTIONS]['result'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[OPTIONS].result as never
	}

	constructor(o: FunctionOptions & O) {
		super(o)

		let argumentsSchema = schema(
			// eslint-disable-next-line security/detect-object-injection
			this[OPTIONS].arguments as never,
		) as unknown as IArray | ITuple

		if (isArray(argumentsSchema)) {
			argumentsSchema = argumentsSchema.mutableArray as never
		} else if (isTuple(argumentsSchema)) {
			argumentsSchema = argumentsSchema.mutableTuple as never
		} else {
			throw new SchemarError(
				'function: arguments schema should be array or tuple',
			)
		}

		// eslint-disable-next-line security/detect-object-injection
		this[OPTIONS].arguments = argumentsSchema
	}

	override [EXTENDS](other: ISchema): boolean {
		if (isUnknownFunction(other)) return true
		else if (isFunction(other)) {
			const argsOk: boolean = _functionArgumentsExtends(
				other.getArgumentsSchema as never,
				this.getArgumentsSchema as never,
			)

			const rOk = (this.getResultSchema as unknown as ISchema).extends(
				other.getResultSchema as never,
			)

			return argsOk && rOk
			// eslint-disable-next-line security/detect-object-injection
		} else return super[EXTENDS](other)
	}

	override _getIssuesImpl(x: unknown): ValidationIssue[] {
		const issues = super._getIssuesImpl(x)

		if (typeof x !== 'function') {
			issues.push(
				new ValidationIssue({
					expectedDescription: 'be function',
					received: x,
				}),
			)
		}

		return issues
	}
}