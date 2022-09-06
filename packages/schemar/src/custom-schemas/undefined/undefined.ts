// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue, undef } from '@voltiso/util'

import { literal } from '../literal'

const undefined_ = lazyValue(() => literal(undef))

export { undefined_ as undefined }
