// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	CustomUnknownLiteral,
	InferableLiteral,
	Literal,
} from '@voltiso/schemar.types'
import { lazyConstructor, lazyValue } from '@voltiso/util'

import { UnknownLiteralImpl } from '~'

export interface UnknownLiteral extends CustomUnknownLiteral<{}> {
	<L extends InferableLiteral>(...literals: L[]): Literal<L>
	<L extends InferableLiteral>(literals: Set<L>): Literal<L>
	<L extends InferableLiteral>(...args: L[] | [Set<L>]): Literal<L>
}

export const UnknownLiteral = lazyConstructor(
	() => UnknownLiteralImpl,
) as unknown as UnknownLiteralConstructor

type UnknownLiteralConstructor = new () => UnknownLiteral

//

export const literal: UnknownLiteral = lazyValue(() => new UnknownLiteral())
