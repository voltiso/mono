// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import {
	$fastAssert,
	BoundCallable,
	CALL,
	lazyConstructor,
	OPTIONS,
} from '@voltiso/util'
import { EXTENDS, SCHEMA_NAME } from '_'

import type { Literal } from '~/core-schemas/literal/Literal'
import { literal } from '~/core-schemas/unknownLiteral/UnknownLiteral'
import { ValidationIssue } from '~/meta-schemas/validationIssue/ValidationIssue'
import { CustomSchemaImpl } from '~/Schema/detail/CustomSchemaImpl'
import type { Schema } from '~/types/Schema/ISchema'
import type { ValidationOptions } from '~/types/Schema/ValidationOptions'

import type { CustomUnknownSymbol } from '../CustomUnknownSymbol'
import { isUnknownSymbolSchema } from '../IUnknownSymbol'
import type { UnknownSymbolOptions } from '../UnknownSymbolOptions'

$fastAssert(OPTIONS)
$fastAssert(EXTENDS)
$fastAssert(SCHEMA_NAME)

// ! esbuild bug: Cannot `declare` inside class - using interface merging instead
// biome-ignore lint/correctness/noUnusedVariables: .
export interface CustomUnknownSymbolImpl<O> {
	readonly [Voltiso.BASE_OPTIONS]: UnknownSymbolOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: UnknownSymbolOptions.Default
}

// biome-ignore lint/suspicious/noUnsafeDeclarationMerging: .
export class CustomUnknownSymbolImpl<O extends Partial<UnknownSymbolOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomUnknownSymbol<O>
{
	override readonly [Voltiso.Schemar.SCHEMA_NAME] = 'UnknownSymbol' as const

	constructor(o: O) {
		super(o)

		// biome-ignore lint/correctness/noConstructorReturn: .
		return BoundCallable(this) as never
	}

	[CALL]<L extends symbol>(...args: L[] | [Set<L>]): Literal<L> {
		const literals = args[0] instanceof Set ? args[0] : new Set(args as L[])
		return literal(literals) as never
	}

	override [Voltiso.Schemar.EXTENDS](other: Schema): boolean {
		if (isUnknownSymbolSchema(other)) return true
		else return super[Voltiso.Schemar.EXTENDS](other)
	}

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
					name: this[Voltiso.OPTIONS].name,
					expected: { description: 'be symbol' },
					received: { value: x },
				}),
			)
		}

		return issues
	}
}
