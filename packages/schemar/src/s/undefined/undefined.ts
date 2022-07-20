// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue, undef } from '@voltiso/util'

import * as s from '..'

const undefined_ = lazyValue(() => s.literal(undef))

export { undefined_ as undefined }
