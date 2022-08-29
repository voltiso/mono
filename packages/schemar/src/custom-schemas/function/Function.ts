// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as t from '@voltiso/schemar.types'
import { lazyConstructor } from '@voltiso/util'

import { FunctionImpl } from '~'

export type Function<F extends (...args: any) => any> = t.Function<F>

export const Function = lazyConstructor(
	() => FunctionImpl,
) as unknown as t.FunctionConstructor
