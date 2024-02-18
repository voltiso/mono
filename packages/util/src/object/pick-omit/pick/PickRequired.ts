// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsOptional } from '~/object'

//

export type RequiredKeys_<O> = {
	[key in keyof O]: IsOptional<O, key> extends false ? key : never
}[keyof O]

export type RequiredKeys<O extends object> = RequiredKeys_<O>

export type $RequiredKeys_<O> = O extends any ? RequiredKeys_<O> : never

export type $RequiredKeys<O extends object> = $RequiredKeys_<O>

//

//

export type PickRequired_<O> = Pick<O, RequiredKeys_<O>>

export type PickRequired<O extends object> = PickRequired_<O>

export type $PickRequired_<O> = O extends any ? PickRequired_<O> : never

export type $PickRequired<O extends object> = $PickRequired_<O>
