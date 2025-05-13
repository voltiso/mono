// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { OptionalKeys_ } from '~/object'

//

export type OmitOptional_<O> = Omit<O, OptionalKeys_<O>>

export type OmitOptional<O extends object> = OmitOptional_<O>

export type $OmitOptional_<O> = O extends any ? OmitOptional_<O> : never

export type $OmitOptional<O extends object> = $OmitOptional_<O>
