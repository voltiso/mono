// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { EXTENDS, SCHEMA_NAME } from '_'
import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'
import { BoundCallable, CALL, lazyConstructor, OPTIONS } from '@voltiso/util'

import type {
	$$Array,
	$$Schemable,
	$$SchemableTuple,
	CustomFunction,
	CustomUnknownFunction,
	DefaultUnknownFunctionOptions,
	FunctionOptions,
	ISchema,
	UnknownFunctionOptions,
} from '~'
import { CustomSchemaImpl, isUnknownFunctionSchema } from '~'
import { FunctionImpl } from '~/base-schemas/function'
import { ValidationIssue } from '~/meta-schemas'

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
		if (isUnknownFunctionSchema(other)) return true
		// eslint-disable-next-line security/detect-object-injection
		else return super[EXTENDS](other)
	}

	override _getIssues(value: unknown): ValidationIssue[] {
		const issues: ValidationIssue[] = []

		if (typeof value !== 'function') {
			issues.push(
				new ValidationIssue({
					// eslint-disable-next-line security/detect-object-injection
					name: this[OPTIONS].name,
					expected: { description: 'be function' },
					received: { value },
				}),
			)
		}

		return issues
	}

	// eslint-disable-next-line class-methods-use-this
	override _toString(): string {
		return 'function'
	}

	/** Without `this` */
	[CALL]<
		Parameters extends $$SchemableTuple | $$Array,
		Return extends $$Schemable,
	>(
		parameters: Parameters,
		return_: Return,
	): CustomFunction<{ parameters: Parameters; return: Return }>

	/** With `this` */
	[CALL]<
		This extends $$Schemable,
		Parameters extends $$SchemableTuple | $$Array,
		Return extends $$Schemable,
	>(
		thisArg: This,
		parameters: Parameters,
		return_: Return,
	): CustomFunction<{ parameters: Parameters; return: Return }>

	/** Custom */
	[CALL]<Options extends FunctionOptions>(
		options: Partial<Options>,
	): CustomFunction<Options>

	//

	// eslint-disable-next-line class-methods-use-this
	[CALL](...args: unknown[]): never {
		let options: Partial<FunctionOptions> = {}

		// eslint-disable-next-line unicorn/prefer-switch
		if (args.length === 1) {
			options = args[0] as Partial<FunctionOptions>
		} else if (args.length === 2) {
			options = { parameters: args[0] as never, return: args[1] as never }
		} else if (args.length === 3) {
			options = {
				this: args[0] as never,
				parameters: args[1] as never,
				return: args[2] as never,
			}
		}

		return new FunctionImpl(options) as never
	}
}
