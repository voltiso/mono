// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	$$Schemable,
	$Output,
	CustomUnknownFunction,
	DefaultUnknownFunctionOptions,
	InferableReadonlyTuple,
	ISchema,
	Output,
	UnknownFunctionOptions,
} from '@voltiso/schemar.types'
import { EXTENDS, isUnknownFunction, SCHEMA_NAME } from '@voltiso/schemar.types'
import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'
import { BoundCallable, CALL, lazyConstructor, OPTIONS } from '@voltiso/util'

import * as s from '~/base-schemas/function'
import { ValidationIssue } from '~/meta-schemas'
import { CustomSchemaImpl } from '~/Schema'

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
		return BoundCallable(this) as never
	}

	override [EXTENDS](other: ISchema): boolean {
		if (isUnknownFunction(other)) return true
		// eslint-disable-next-line security/detect-object-injection
		else return super[EXTENDS](other)
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

	// eslint-disable-next-line class-methods-use-this
	override _toString(): string {
		return 'function'
	}

	// eslint-disable-next-line class-methods-use-this
	[CALL]<
		Args extends InferableReadonlyTuple | ISchema<readonly unknown[]>,
		R extends $$Schemable,
	>(
		argumentsSchema: Args,
		resultSchema: R,
	): s.Function<(...args: [...$Output<Args>]) => Output<R>> {
		return new s.Function(argumentsSchema as never, resultSchema) as never
	}
}
