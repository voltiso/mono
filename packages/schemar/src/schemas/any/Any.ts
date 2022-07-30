// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue } from '@voltiso/util'

import type { CustomAny } from '~'
import { AnyImpl } from '~'

type AnyConstructor = new () => Any

export type Any = CustomAny<{}>
export const Any = AnyImpl as unknown as AnyConstructor

export const any: Any = lazyValue(() => new Any())
