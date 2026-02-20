// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import {
	$fastAssert,
	BoundCallable,
	CALL,
	lazyConstructor,
} from '@voltiso/util'
import { EXTENDS, SCHEMA_NAME } from '_'

import { LiteralImpl } from '~/core-schemas/literal/_/LiteralImpl'
import { CustomSchemaImpl } from '~/Schema/detail/CustomSchemaImpl'
import type { InferableLiteral } from '~/types/Inferable/Inferable'
import type { Schema } from '~/types/Schema/ISchema'

import type { CustomUnknownLiteral } from '../CustomUnknownLiteral'
import { isUnknownLiteralSchema } from '../isUnknownLiteral'
import type { UnknownLiteralOptions } from '../UnknownLiteralOptions'

$fastAssert(EXTENDS)
$fastAssert(SCHEMA_NAME)

// ! esbuild bug: Cannot `declare` inside class - using interface merging instead
// biome-ignore lint/correctness/noUnusedVariables: .
export interface CustomUnknownLiteralImpl<O> {
	readonly [Voltiso.BASE_OPTIONS]: UnknownLiteralOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: UnknownLiteralOptions.Default
}

// biome-ignore lint/suspicious/noUnsafeDeclarationMerging: .
export class CustomUnknownLiteralImpl<O extends Partial<UnknownLiteralOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomUnknownLiteral<O>
{
	override readonly [Voltiso.Schemar.SCHEMA_NAME] = 'UnknownLiteral' as const

	constructor(o: O) {
		super(o)

		// biome-ignore lint/correctness/noConstructorReturn: .
		return BoundCallable(this) as never
	}

	override [Voltiso.Schemar.EXTENDS](other: Schema): boolean {
		if (isUnknownLiteralSchema(other)) return true
		else return super[Voltiso.Schemar.EXTENDS](other)
	}

	override _toString(): string {
		return 'literal'
	}

	[CALL]<L extends InferableLiteral>(...literals: L[]): LiteralImpl<L>
	[CALL]<L extends InferableLiteral>(literals: Set<L>): LiteralImpl<L>
	[CALL]<L extends InferableLiteral>(...args: L[] | [Set<L>]): LiteralImpl<L>

	[CALL]<L extends InferableLiteral>(...args: L[] | [Set<L>]): LiteralImpl<L> {
		return new LiteralImpl(...args) as never
	}
}
