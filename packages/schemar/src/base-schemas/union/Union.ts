// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as t from '@voltiso/schemar.types'
import { lazyConstructor } from '@voltiso/util'

import { UnionImpl } from './_'

export type Union<Ts extends t.$$Schemable[]> = t.Union<Ts>

export const Union = lazyConstructor(
	() => UnionImpl,
) as unknown as t.UnionConstructor
