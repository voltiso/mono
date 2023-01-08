// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor, lazyValue } from '@voltiso/util'

import type { CustomUnknownLiteral, InferableLiteral, Literal } from '~'

import { UnknownLiteralImpl } from './_'

export interface UnknownLiteral extends CustomUnknownLiteral<{}> {
	<L extends InferableLiteral>(...literals: L[]): Literal<L>
	<L extends InferableLiteral>(literals: Set<L>): Literal<L>
	<L extends InferableLiteral>(...args: L[] | [Set<L>]): Literal<L>
}

export type UnknownLiteralConstructor = new () => UnknownLiteral

//

export const UnknownLiteral = lazyConstructor(
	() => UnknownLiteralImpl,
) as unknown as UnknownLiteralConstructor

//

export const literal: UnknownLiteral = lazyValue(() => new UnknownLiteral())
