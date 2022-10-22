// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { $Assert, $assert } from '@voltiso/util'

$Assert<IsIdentical<true, true>>()

$assert.defined(1)

$assert(0)

export {}
