// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyObject } from '@voltiso/util'

import type { Literal$ } from '~/core-schemas/literal/Literal'
import { literal } from '~/core-schemas/unknownLiteral/UnknownLiteral'

// eslint-disable-next-line @typescript-eslint/naming-convention
export type __hack_baseSchemas_null = Literal$<0>

const null_ = lazyObject(() => literal(null))

export { null_ as null }
