// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue, undef } from '@voltiso/util'

import { literal } from '~'

const undefined_ = lazyValue(() => literal(undef))

export { undefined_ as undefined }
