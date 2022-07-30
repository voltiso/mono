// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { CALL, callableInstance, lazyConstructor } from '@voltiso/util'

import type {
	CustomUnknownFunction,
	DefaultUnknownFunctionOptions,
	GetOutputType,
	InferableReadonlyTuple,
	ISchema,
	Schemable,
	UnknownFunctionOptions,
	ValidationIssue,
} from '~'
import {
	BASE_OPTIONS,
	CustomSchemaImpl,
	DEFAULT_OPTIONS,
	EXTENDS,
	isUnknownFunction,
	SCHEMA_NAME,
} from '~'
import * as s from '~'

export class CustomUnknownFunctionImpl<
		O extends Partial<UnknownFunctionOptions>,
	>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomUnknownFunction<O>
{
	declare readonly [SCHEMA_NAME]: 'UnknownFunction';

	declare readonly [BASE_OPTIONS]: UnknownFunctionOptions;
	declare readonly [DEFAULT_OPTIONS]: DefaultUnknownFunctionOptions

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
		return super._getIssuesImpl(x)
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
	): s.Function<(...args: GetOutputType<Args>) => GetOutputType<R>> {
		return new s.Function(argumentsSchema as never, resultSchema) as never
	}
}
