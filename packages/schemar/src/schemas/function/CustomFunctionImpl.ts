// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Assume } from '@voltiso/util'
import { lazyConstructor } from '@voltiso/util'

import type {
	CustomFunction,
	DefaultFunctionOptions,
	FunctionOptions,
	ISchema,
	MergeSchemaOptions,
} from '~'
import {
	_functionArgumentsExtends,
	BASE_OPTIONS,
	CustomSchemaImpl,
	DEFAULT_OPTIONS,
	EXTENDS,
	OPTIONS,
	PARTIAL_OPTIONS,
	SCHEMA_NAME,
	SchemarError,
} from '~'
import * as s from '~'

export class CustomFunctionImpl<O extends Partial<FunctionOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomFunction<O>
{
	declare readonly [SCHEMA_NAME]: 'Function';

	declare readonly [BASE_OPTIONS]: FunctionOptions;
	declare readonly [DEFAULT_OPTIONS]: DefaultFunctionOptions;

	declare readonly [PARTIAL_OPTIONS]: O;

	declare readonly [OPTIONS]: Assume<
		FunctionOptions,
		MergeSchemaOptions<DefaultFunctionOptions, O>
	>

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

		let argumentsSchema = s.schema(o.arguments as never) as unknown as
			| s.IArray
			| s.ITuple

		if (s.isArray(argumentsSchema)) {
			argumentsSchema = argumentsSchema.readonlyArray as never
		} else if (s.isTuple(argumentsSchema)) {
			argumentsSchema = argumentsSchema.readonlyTuple as never
		} else {
			throw new SchemarError(
				'function: arguments schema should be array or tuple',
			)
		}

		o.arguments = argumentsSchema
	}

	override [EXTENDS](other: ISchema): boolean {
		if (s.isFunction(other)) {
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

	override _getIssuesImpl(x: unknown): s.ValidationIssue[] {
		const issues = super._getIssuesImpl(x)

		if (typeof x !== 'function') {
			issues.push(
				new s.ValidationIssue({
					expectedDescription: 'be function',
					received: x,
				}),
			)
		}

		return issues
	}
}
