// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue } from '@voltiso/util'

import type { CustomUnknownLiteral, InferableLiteral, Literal } from '~'
import { UnknownLiteralImpl } from '~'

export interface UnknownLiteral extends CustomUnknownLiteral<{}> {
	<L extends InferableLiteral>(...literals: L[]): Literal<L>
	<L extends InferableLiteral>(literals: Set<L>): Literal<L>
	<L extends InferableLiteral>(...args: L[] | [Set<L>]): Literal<L>
}

export const UnknownLiteral =
	UnknownLiteralImpl as unknown as UnknownLiteralConstructor

type UnknownLiteralConstructor = new () => UnknownLiteral

//

export const literal: UnknownLiteral = lazyValue(() => new UnknownLiteral())
