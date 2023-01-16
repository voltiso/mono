// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type { CustomLiteral, CustomLiteral$, InferableLiteral } from '~'
import { LiteralImpl } from '~'

export interface Literal<T extends InferableLiteral>
	extends CustomLiteral<{
		Output: T
		Input: T
	}> {}

export interface Literal$<T extends InferableLiteral>
	extends CustomLiteral$<{
		Output: T
		Input: T
	}> {}

//

export interface Literal$Constructor {
	new <L extends InferableLiteral>(...literals: L[]): Literal$<L>
	new <L extends InferableLiteral>(literals: Set<L>): Literal$<L>
	new <L extends InferableLiteral>(...args: L[] | [Set<L>]): Literal$<L>
}

export const Literal$ = lazyConstructor(
	() => LiteralImpl,
) as unknown as Literal$Constructor
