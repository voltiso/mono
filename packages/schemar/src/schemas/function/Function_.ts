// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { OmitCall } from '@voltiso/util'
import { CALL, callableInstance, lazyConstructor } from '@voltiso/util'

import { SchemarError } from '../../error/index'
import type {
	InferableReadonlyTuple,
	IRootSchema,
	RootSchemable,
} from '../../Schema/index'
import { SCHEMA_OPTIONS, CustomSchemaImpl } from '../../Schema/index'
import { EXTENDS } from '../../Schema/detail/symbols.js'
import * as s from '../index'
import { isArray } from '../array/index'
import { isTuple } from '../tuple/index'
import { _functionArgumentsExtends } from './_/_functionArgumentsExtends.js'
import type { FunctionOptions } from './_/FunctionOptions.js'
import { defaultFunctionOptions } from './_/FunctionOptions.js'
import type { CustomFunction } from './CustomFunction.js'
import { Function } from './Function.js'
import { IS_FUNCTION, isFunction } from './IFunction.js'

class Function__<O extends FunctionOptions>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements OmitCall<CustomFunction<O>>
{
	readonly [IS_FUNCTION] = true

	get getArgumentsSchema(): this[OPTIONS]['arguments'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[SCHEMA_OPTIONS].arguments
	}

	get getResultSchema(): this[OPTIONS]['result'] {
		// eslint-disable-next-line security/detect-object-injection
		return this[SCHEMA_OPTIONS].result
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
				'function: arguments schema should be array or tuple',
			)
		}

		// eslint-disable-next-line no-constructor-return
		return callableInstance(this) as never
	}

	// eslint-disable-next-line class-methods-use-this
	[CALL]<
		Args extends InferableReadonlyTuple | ((s.ITuple | s.IArray) & IRootSchema),
		R extends RootSchemable,
	>(args: Args, r: R): s.Function<Args, R> {
		return new Function(args, r)
	}

	override [EXTENDS](other: IRootSchema): boolean {
		if (isFunction(other)) {
			const argsOk = _functionArgumentsExtends(
				other.getArgumentsSchema,
				this.getArgumentsSchema,
			)

			const rOk = this.getResultSchema.extends(other.getResultSchema)

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

export class Function_<
	Args extends InferableReadonlyTuple | s.ITuple | s.IArray,
	R extends RootSchemable,
> extends Function__<never> {
	constructor(args: Args, result: R) {
		super({
			...defaultFunctionOptions,
			arguments: s.schema(args as never),
			result: s.schema(result),
		} as never)
	}
}
