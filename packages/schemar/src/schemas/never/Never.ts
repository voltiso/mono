// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue } from '@voltiso/util'

import type { CustomNever } from '.'
import { CustomNeverImpl } from '.'

type NeverConstructor = new () => Never

export type Never = CustomNever<{}>
export const Never = CustomNeverImpl as unknown as NeverConstructor

export const never = lazyValue(() => new Never())
