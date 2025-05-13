// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { $Assert, $fastAssert } from '@voltiso/util'

$Assert<IsIdentical<true, true>>()

$fastAssert.defined(1)

$fastAssert(0)

export {}
