// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as t from '@voltiso/schemar.types'
import { lazyConstructor, lazyValue } from '@voltiso/util'

import { AnyImpl } from './AnyImpl'

export type Any = t.Any

export const Any = lazyConstructor(() => AnyImpl) as unknown as t.AnyConstructor

export const any: Any = lazyValue(() => new Any())
