// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	BASE_OPTIONS,
	CustomFunction,
	DEFAULT_OPTIONS,
	DefaultFunctionOptions,
	FunctionOptions,
	IArray,
	ITuple,
	Schema,
	SchemaLike,
} from '@voltiso/schemar.types'
import { isUnknownFunction } from '@voltiso/schemar.types'
import * as t from '@voltiso/schemar.types'
import { isArray, isTuple } from '@voltiso/schemar.types'
import { EXTENDS, OPTIONS, SCHEMA_NAME } from '@voltiso/schemar.types'
import { lazyConstructor } from '@voltiso/util'

import {
	_functionArgumentsExtends,
	CustomSchemaImpl,
	schema,
	SchemarError,
	ValidationIssue,
} from '~'

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomFunctionImpl<O> {
	readonly [BASE_OPTIONS]: FunctionOptions
	readonly [DEFAULT_OPTIONS]: DefaultFunctionOptions

	// readonly [PARTIAL_OPTIONS]: O

	// readonly [OPTIONS]: Assume<
	// 	FunctionOptions,
	// 	MergeSchemaOptions<DefaultFunctionOptions, O>
	// >
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

	override [EXTENDS](other: SchemaLike): boolean {
		if (isUnknownFunction(other)) return true
		else if (t.isFunction(other)) {
			const argsOk: boolean = _functionArgumentsExtends(
				other.getArgumentsSchema as never,
				this.getArgumentsSchema as never,
			)

			const rOk = (this.getResultSchema as unknown as Schema).extends(
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
