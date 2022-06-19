/* eslint-disable @typescript-eslint/ban-types */
import {
	IRootSchema,
	RootSchemable,
	InferableReadonlyTuple,
	Schema_,
	OPTIONS,
} from '../../schema'
import { EXTENDS } from '../../schema/_/symbols'
import { CALL, callableInstance, lazyConstructor } from '@voltiso/ts-util/class'
import { defaultFunctionOptions, FunctionOptions } from './_/FunctionOptions'
import { OmitCall } from '@voltiso/ts-util/object'
import { isFunction, IS_FUNCTION } from './IFunction'
import { CustomFunction } from './CustomFunction'
import { Function } from './Function'
import { isArray } from '../array'
import { isTuple } from '../tuple'
import { SchemarError } from '../../errors'
import * as s from '..'
import { _functionArgumentsExtends } from './_/_functionArgumentsExtends'

class Function__<O extends FunctionOptions>
	extends lazyConstructor(() => Schema_)<O>
	implements OmitCall<CustomFunction<O>>
{
	readonly [IS_FUNCTION] = true

	get getArgumentsSchema(): this[OPTIONS]['arguments'] {
		return this[OPTIONS].arguments
	}

	get getResultSchema(): this[OPTIONS]['result'] {
		return this[OPTIONS].result
	}

	constructor(o: O) {
		super(o)

		o.arguments = s.schema(o.arguments)
		if (isArray(o.arguments)) {
			o.arguments = o.arguments.readonlyArray as never
		} else if (isTuple(o.arguments)) {
			o.arguments = o.arguments.readonlyTuple as never
		} else {
			throw new SchemarError(
				'function: arguments schema should be array or tuple'
			)
		}

		return callableInstance(this) as never
	}

	[CALL]<
		Args extends InferableReadonlyTuple | ((s.ITuple | s.IArray) & IRootSchema),
		R extends RootSchemable
	>(args: Args, r: R): s.Function<Args, R> {
		return new Function(args, r)
	}

	override [EXTENDS](other: IRootSchema): boolean {
		if (isFunction(other)) {
			const argsOk = _functionArgumentsExtends(
				other.getArgumentsSchema,
				this.getArgumentsSchema
			)

			const rOk = this.getResultSchema.extends(other.getResultSchema)

			return argsOk && rOk
		} else return super[EXTENDS](other)
	}

	override _getIssuesImpl(x: unknown): s.ValidationIssue[] {
		const issues = super._getIssuesImpl(x)

		if (typeof x !== 'function') {
			issues.push(
				new s.ValidationIssue({
					expectedDescription: 'be function',
					received: x,
				})
			)
		}

		return issues
	}
}

export class Function_<
	Args extends InferableReadonlyTuple | s.ITuple | s.IArray,
	R extends RootSchemable
> extends Function__<never> {
	constructor(args: Args, result: R) {
		super({
			...defaultFunctionOptions,
			arguments: s.schema(args as never),
			result: s.schema(result),
		} as never)
	}
}
