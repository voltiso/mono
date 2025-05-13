// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type { InferableLiteral } from '~/types/Inferable/Inferable'

import { LiteralImpl } from './_/LiteralImpl'
import type { CustomLiteral, CustomLiteral$ } from './CustomLiteral'

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
