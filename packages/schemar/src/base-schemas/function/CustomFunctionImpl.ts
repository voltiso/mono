// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	CustomFunction,
	DefaultFunctionOptions,
	FunctionOptions,
	IArray,
	ITuple,
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
import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'
import { lazyConstructor, OPTIONS } from '@voltiso/util'

import { schema } from '~/core-schemas'
import { SchemarError } from '~/error'
import { ValidationIssue } from '~/meta-schemas'
import { CustomSchemaImpl } from '~/Schema'

import { _flattenUnion, union } from '../union'
import { _functionArgumentsExtends } from './_functionArgumentsExtends'

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomFunctionImpl<O> {
	readonly [BASE_OPTIONS]: FunctionOptions
	readonly [DEFAULT_OPTIONS]: DefaultFunctionOptions
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

		const argumentsSchema = schema(
			// eslint-disable-next-line security/detect-object-injection
			this[OPTIONS].arguments as never,
		) as unknown as IArray | ITuple

		// eslint-disable-next-line etc/no-internal
		let argumentsUnionSchemas = _flattenUnion(argumentsSchema).getSchemas

		argumentsUnionSchemas = argumentsUnionSchemas.map(s => {
			if (isArray(s)) {
				return s.mutableArray as never
			} else if (isTuple(s)) {
				return s.mutableTuple as never
			} else {
				throw new SchemarError(
					'function: arguments schema should be array or tuple',
				)
			}
		})

		const finalArgumentsSchema =
			argumentsUnionSchemas.length === 1
				? argumentsUnionSchemas[0]
				: union(...argumentsUnionSchemas)

		// eslint-disable-next-line security/detect-object-injection
		this[OPTIONS].arguments = finalArgumentsSchema as never
		// ! TODO - typings for arguments are incorrect
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
