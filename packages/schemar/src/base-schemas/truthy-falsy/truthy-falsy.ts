// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Falsy } from '@voltiso/util'

import type { CustomUnknown$, Unknown$ } from '../unknown'
import { unknown } from '../unknown'

export type __hack_truthyFalsy = CustomUnknown$<{}> | Unknown$

export const falsy = unknown.check(x => !x, 'be falsy').Cast<Falsy>()
// export const falsy = s.literal(false, undefined, null, 0, '').or(s.void)

export const truthy = unknown.check(x => !!x, 'be truthy')
