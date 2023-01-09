// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue } from '@voltiso/util'

import { literal } from '~'

import { unknown } from './unknown'

export const optional = lazyValue(() => unknown.optional)
export const readonly = lazyValue(() => unknown.readonly)

export const nullish = lazyValue(() => literal(null, undefined))
