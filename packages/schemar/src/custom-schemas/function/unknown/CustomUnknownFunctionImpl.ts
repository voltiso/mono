// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import {
	type BASE_OPTIONS,
	type DEFAULT_OPTIONS,
	EXTENDS,
	SCHEMA_NAME,
} from '_'
import { CALL, callableInstance, lazyConstructor } from '@voltiso/util'

import type {
	CustomUnknownFunction,
	DefaultUnknownFunctionOptions,
	GetOutputType,
	InferableReadonlyTuple,
	ISchema,
	Schemable,
	UnknownFunctionOptions,
} from '~'
import {
	CustomSchemaImpl,
	Function,
	isUnknownFunction,
	ValidationIssue,
} from '~'

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomUnknownFunctionImpl<O> {
	readonly [BASE_OPTIONS]: UnknownFunctionOptions
	readonly [DEFAULT_OPTIONS]: DefaultUnknownFunctionOptions
}

export class CustomUnknownFunctionImpl<
		O extends Partial<UnknownFunctionOptions>,
	>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomUnknownFunction<O>
{
	readonly [SCHEMA_NAME] = 'UnknownFunction' as const

	constructor(o: O) {
		super(o)
		// eslint-disable-next-line no-constructor-return
		return callableInstance(this) as never
	}

	override [EXTENDS](other: ISchema): boolean {
		if (isUnknownFunction(other)) return true
		// eslint-disable-next-line security/detect-object-injection
		else return super[EXTENDS](other)
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

	// eslint-disable-next-line class-methods-use-this
	override _toString(): string {
		return 'function'
	}

	// eslint-disable-next-line class-methods-use-this
	[CALL]<
		Args extends InferableReadonlyTuple | ISchema<readonly unknown[]>,
		R extends Schemable,
	>(
		argumentsSchema: Args,
		resultSchema: R,
		// eslint-disable-next-line @typescript-eslint/ban-types
	): Function<(...args: GetOutputType<Args>) => GetOutputType<R>> {
		return new Function(argumentsSchema as never, resultSchema) as never
	}
}
