// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyObject } from '@voltiso/util'

import type { Literal$ } from '~/core-schemas/index.js'
import { literal } from '~/core-schemas/unknownLiteral/UnknownLiteral'

import type { CustomUnknown$ } from './unknown/CustomUnknown'
import { unknown } from './unknown/Unknown'

export type __hack_baseSchemas_misc = CustomUnknown$<{}> | Literal$<0>

export const optional = lazyObject(() => unknown.optional)
export const readonly = lazyObject(() => unknown.readonly)

export const nullish = lazyObject(() => literal(null, undefined))
