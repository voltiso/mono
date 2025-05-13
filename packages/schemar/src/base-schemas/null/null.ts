// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyObject } from '@voltiso/util'

import type { Literal$ } from '~/core-schemas/literal/Literal'
import { literal } from '~/core-schemas/unknownLiteral/UnknownLiteral'

export type __hack_baseSchemas_null = Literal$<0>

// eslint-disable-next-line sonarjs/variable-name
const null_ = lazyObject(() => literal(null))

export { null_ as null }
