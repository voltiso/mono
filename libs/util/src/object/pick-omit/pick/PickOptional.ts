// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsOptional } from '~/object'

export type OptionalKeys_<O> = {
	[key in keyof O]: IsOptional<O, key> extends true ? key : never
}[keyof O]

export type OptionalKeys<O extends object> = OptionalKeys_<O>

export type $OptionalKeys_<O> = O extends any ? OptionalKeys_<O> : never

export type $OptionalKeys<O extends object> = $OptionalKeys_<O>

//

//

export type PickOptional_<O> = Pick<O, OptionalKeys_<O>>

export type PickOptional<O extends object> = PickOptional_<O>

export type $PickOptional_<O> = O extends any ? PickOptional_<O> : never

export type $PickOptional<O extends object> = $PickOptional_<O>
