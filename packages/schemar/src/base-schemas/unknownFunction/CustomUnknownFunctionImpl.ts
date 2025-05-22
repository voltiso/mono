// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { EXTENDS, SCHEMA_NAME } from '_'
import {
	$fastAssert,
	BoundCallable,
	CALL,
	lazyConstructor,
	OPTIONS,
} from '@voltiso/util'

import type { CustomFunction, FunctionOptions } from '~/base-schemas/function'
import { FunctionImpl } from '~/base-schemas/function'
import { ValidationIssue } from '~/meta-schemas'
import { CustomSchemaImpl } from '~/Schema/detail/CustomSchemaImpl'
import type { $$SchemableTuple } from '~/types/Inferable/Inferable'
import type { Schema } from '~/types/Schema/ISchema'
import type { $$Schemable } from '~/types/Schemable/Schemable'

import type { $$Array } from '../array/IArray'
import type { CustomUnknownFunction } from './CustomUnknownFunction'
import { isUnknownFunctionSchema } from './IUnknownFunction'
import type { UnknownFunctionOptions } from './UnknownFunctionOptions'

$fastAssert(OPTIONS)
$fastAssert(EXTENDS)
$fastAssert(SCHEMA_NAME)

// ! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomUnknownFunctionImpl<O> {
	readonly [Voltiso.BASE_OPTIONS]: UnknownFunctionOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: UnknownFunctionOptions.Default
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CustomUnknownFunctionImpl<
		O extends Partial<UnknownFunctionOptions>,
	>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomUnknownFunction<O>
{
	// eslint-disable-next-line es-x/no-class-instance-fields
	override readonly [Voltiso.Schemar.SCHEMA_NAME] = 'UnknownFunction' as const

	constructor(o: O) {
		super(o)
		// eslint-disable-next-line no-constructor-return
		return BoundCallable(this) as never
	}

	override [Voltiso.Schemar.EXTENDS](other: Schema): boolean {
		if (isUnknownFunctionSchema(other)) return true
		else return super[Voltiso.Schemar.EXTENDS](other)
	}

	override _getIssues(value: unknown): ValidationIssue[] {
		const issues: ValidationIssue[] = []

		if (typeof value !== 'function') {
			issues.push(
				new ValidationIssue({
					name: this[Voltiso.OPTIONS].name,
					expected: { description: 'be function' },
					received: { value },
				}),
			)
		}

		return issues
	}

	// eslint-disable-next-line @typescript-eslint/class-methods-use-this
	override _toString(): string {
		return 'function'
	}

	/** Without `this` */
	[CALL]<
		Parameters extends $$SchemableTuple | $$Array,
		Return extends $$Schemable,
	>(
		parameters: Parameters,
		// eslint-disable-next-line sonarjs/variable-name
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
		// eslint-disable-next-line sonarjs/variable-name
		return_: Return,
	): CustomFunction<{ parameters: Parameters; return: Return }>

	// eslint-disable-next-line jsdoc/informative-docs
	/** Custom */
	[CALL]<Options extends FunctionOptions>(
		options: Partial<Options>,
	): CustomFunction<Options>

	//

	// eslint-disable-next-line @typescript-eslint/class-methods-use-this
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
