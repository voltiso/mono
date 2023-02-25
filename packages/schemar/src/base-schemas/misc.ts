// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyObject } from '@voltiso/util'

import { literal } from '~/core-schemas/unknownLiteral/UnknownLiteral'

import { unknown } from './unknown/Unknown'

export const optional = lazyObject(() => unknown.optional)
export const readonly = lazyObject(() => unknown.readonly)

export const nullish = lazyObject(() => literal(null, undefined))
