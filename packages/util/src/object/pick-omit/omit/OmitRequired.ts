// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { RequiredKeys_ } from '../pick'

export type OmitRequired_<O> = Omit<O, RequiredKeys_<O>>

export type OmitRequired<O extends object> = OmitRequired_<O>

export type $OmitRequired_<O> = O extends any ? OmitRequired_<O> : never

export type $OmitRequired<O extends object> = $OmitRequired_<O>
