// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { InferableLiteral } from '~/Inferable'

import type { Literal } from '../Literal'
import type { CustomUnknownLiteral } from './CustomUnknownLiteral'

export interface UnknownLiteral extends CustomUnknownLiteral<{}> {
	<L extends InferableLiteral>(...literals: L[]): Literal<L>
	<L extends InferableLiteral>(literals: Set<L>): Literal<L>
	<L extends InferableLiteral>(...args: L[] | [Set<L>]): Literal<L>
}

export type UnknownLiteralConstructor = new () => UnknownLiteral
