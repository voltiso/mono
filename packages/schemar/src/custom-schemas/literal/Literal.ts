// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type { CustomLiteral, InferableLiteral } from '~'
import { LiteralImpl } from '~'

export type Literal<T extends InferableLiteral> = CustomLiteral<{
	values: Set<T>
	Output: T
	Input: T
}>

export const Literal = lazyConstructor(
	() => LiteralImpl,
) as unknown as LiteralConstructor

interface LiteralConstructor {
	new <L extends InferableLiteral>(...literals: L[]): Literal<L>
	new <L extends InferableLiteral>(literals: Set<L>): Literal<L>
	new <L extends InferableLiteral>(...args: L[] | [Set<L>]): Literal<L>
}
