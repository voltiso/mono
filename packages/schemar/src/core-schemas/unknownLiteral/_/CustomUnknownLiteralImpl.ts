// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { EXTENDS, SCHEMA_NAME } from '_'
import {
	$fastAssert,
	BoundCallable,
	CALL,
	lazyConstructor,
} from '@voltiso/util'

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
export interface CustomUnknownLiteralImpl<O> {
	readonly [Voltiso.BASE_OPTIONS]: UnknownLiteralOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: UnknownLiteralOptions.Default
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CustomUnknownLiteralImpl<O extends Partial<UnknownLiteralOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomUnknownLiteral<O>
{
	// eslint-disable-next-line es-x/no-class-instance-fields
	override readonly [Voltiso.Schemar.SCHEMA_NAME] = 'UnknownLiteral' as const

	constructor(o: O) {
		super(o)
		// eslint-disable-next-line no-constructor-return
		return BoundCallable(this) as never
	}

	override [Voltiso.Schemar.EXTENDS](other: Schema): boolean {
		if (isUnknownLiteralSchema(other)) return true
		else return super[Voltiso.Schemar.EXTENDS](other)
	}

	// eslint-disable-next-line @typescript-eslint/class-methods-use-this
	override _toString(): string {
		return 'literal'
	}

	[CALL]<L extends InferableLiteral>(...literals: L[]): LiteralImpl<L>
	[CALL]<L extends InferableLiteral>(literals: Set<L>): LiteralImpl<L>
	[CALL]<L extends InferableLiteral>(...args: L[] | [Set<L>]): LiteralImpl<L>

	// eslint-disable-next-line @typescript-eslint/class-methods-use-this
	[CALL]<L extends InferableLiteral>(...args: L[] | [Set<L>]): LiteralImpl<L> {
		return new LiteralImpl(...args) as never
	}
}
