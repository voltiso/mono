// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as t from '@voltiso/schemar.types'
import { lazyConstructor } from '@voltiso/util'

import { LiteralImpl } from '~'

export type Literal<T extends t.InferableLiteral> = t.Literal<T>

export const Literal = lazyConstructor(
	() => LiteralImpl,
) as unknown as t.LiteralConstructor
