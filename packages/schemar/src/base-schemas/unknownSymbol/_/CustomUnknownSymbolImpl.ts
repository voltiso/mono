// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { EXTENDS, SCHEMA_NAME } from '_'
import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'
import { BoundCallable, CALL, lazyConstructor, OPTIONS } from '@voltiso/util'

import type {
	CustomUnknownSymbol,
	ISchema,
	UnknownSymbolOptions,
	ValidationOptions,
} from '~'
import { CustomSchemaImpl, isUnknownSymbolSchema } from '~'
import type { Literal } from '~/core-schemas'
import { literal } from '~/core-schemas'
import { ValidationIssue } from '~/meta-schemas'

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomUnknownSymbolImpl<O> {
	readonly [BASE_OPTIONS]: UnknownSymbolOptions
	readonly [DEFAULT_OPTIONS]: UnknownSymbolOptions.Default
}

export class CustomUnknownSymbolImpl<O extends Partial<UnknownSymbolOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomUnknownSymbol<O>
{
	readonly [SCHEMA_NAME] = 'UnknownSymbol' as const

	constructor(o: O) {
		super(o)
		// eslint-disable-next-line no-constructor-return
		return BoundCallable(this) as never
	}

	// eslint-disable-next-line class-methods-use-this
	[CALL]<L extends symbol>(...args: L[] | [Set<L>]): Literal<L> {
		const literals = args[0] instanceof Set ? args[0] : new Set(args as L[])
		return literal(literals) as never
	}

	override [EXTENDS](other: ISchema): boolean {
		if (isUnknownSymbolSchema(other)) return true
		// eslint-disable-next-line security/detect-object-injection
		else return super[EXTENDS](other)
	}

	// eslint-disable-next-line class-methods-use-this
	override _toString(): string {
		return 'symbol'
	}

	//

	protected override _getIssues(
		x: unknown,
		_options?: Partial<ValidationOptions> | undefined,
	): ValidationIssue[] {
		const issues = []

		if (typeof x !== 'symbol') {
			issues.push(
				new ValidationIssue({
					// eslint-disable-next-line security/detect-object-injection
					name: this[OPTIONS].name,
					expected: { description: 'be symbol' },
					received: { value: x },
				}),
			)
		}

		return issues
	}
}
