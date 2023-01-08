// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor, lazyValue } from '@voltiso/util'

import type { CustomAny } from '~'

import { AnyImpl } from './AnyImpl'

//

export type Any = CustomAny<{}>
export const Any = lazyConstructor(() => AnyImpl) as unknown as AnyConstructor

export type AnyConstructor = new () => Any

//

export const any: Any = lazyValue(() => new Any())
