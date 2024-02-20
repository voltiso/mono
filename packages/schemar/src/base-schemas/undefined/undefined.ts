// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyObject } from '@voltiso/util'

import type { Literal$ } from '~/core-schemas'
import { literal } from '~/core-schemas'

export type __hack_baseSchemas_undefined = Literal$<0>

const undefined_ = lazyObject(() => literal(undefined))

export { undefined_ as undefined }
