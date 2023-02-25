// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { EXTENDS, SCHEMA_NAME } from '_'
import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'
import { BoundCallable, CALL, lazyConstructor } from '@voltiso/util'

import { LiteralImpl } from '~/core-schemas/literal/_/LiteralImpl'
import { CustomSchemaImpl } from '~/Schema/detail/CustomSchemaImpl'
import type { InferableLiteral } from '~/types/Inferable/Inferable'
import type { ISchema } from '~/types/Schema/ISchema'

import type { CustomUnknownLiteral } from '../CustomUnknownLiteral'
import { isUnknownLiteralSchema } from '../isUnknownLiteral'
import type { UnknownLiteralOptions } from '../UnknownLiteralOptions'

//! esbuild bug: Cannot `declare` inside class - using interface merging instead
export interface CustomUnknownLiteralImpl<O> {
	readonly [BASE_OPTIONS]: UnknownLiteralOptions
	readonly [DEFAULT_OPTIONS]: UnknownLiteralOptions.Default
}

export class CustomUnknownLiteralImpl<O extends Partial<UnknownLiteralOptions>>
	extends lazyConstructor(() => CustomSchemaImpl)<O>
	implements CustomUnknownLiteral<O>
{
	readonly [SCHEMA_NAME] = 'UnknownLiteral' as const

	constructor(o: O) {
		super(o)
		// eslint-disable-next-line no-constructor-return
		return BoundCallable(this) as never
	}

	override [EXTENDS](other: ISchema): boolean {
		if (isUnknownLiteralSchema(other)) return true
		else return super[EXTENDS](other)
	}

	// eslint-disable-next-line class-methods-use-this
	override _toString(): string {
		return 'literal'
	}

	[CALL]<L extends InferableLiteral>(...literals: L[]): LiteralImpl<L>
	[CALL]<L extends InferableLiteral>(literals: Set<L>): LiteralImpl<L>
	[CALL]<L extends InferableLiteral>(...args: L[] | [Set<L>]): LiteralImpl<L>

	// eslint-disable-next-line class-methods-use-this
	[CALL]<L extends InferableLiteral>(...args: L[] | [Set<L>]): LiteralImpl<L> {
		return new LiteralImpl(...args) as never
	}
}
