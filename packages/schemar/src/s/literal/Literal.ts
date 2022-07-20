// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Merge2Simple } from '@voltiso/util'

import type { InferableLiteral } from '../../schema'
import type { DefaultLiteralOptions } from './_/LiteralOptions.js'
import type { CustomLiteral } from './CustomLiteral.js'
import { Literal_ } from './Literal_.js'

export type Literal<T extends InferableLiteral> = CustomLiteral<
	Merge2Simple<DefaultLiteralOptions, { values: Set<T>; _out: T; _in: T }>
>

export const Literal = Literal_ as unknown as LiteralConstructor

interface LiteralConstructor {
	new <L extends InferableLiteral>(...literals: L[]): Literal<L>
	new <L extends InferableLiteral>(literals: Set<L>): Literal<L>
	new <L extends InferableLiteral>(...args: L[] | [Set<L>]): Literal<L>
}
