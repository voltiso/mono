// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { PickPrecise_ } from './PickPrecise'
import type { PickSimple_ } from './PickSimple'

export type VPick_<O, K> = string extends keyof O
	? string extends K
		? PickPrecise_<O, K>
		: VPick_2<O, K>
	: VPick_2<O, K>

export type VPick<O extends object, K extends keyof O> = VPick_<O, K>

//

// type GetKeys<O, K> = Value<{
// 	[k in keyof O]: k extends K ? k : never
// }>

type VPick_2<O, K> = number extends keyof O
	? number extends K
		? PickPrecise_<O, K>
		: VPick_3<O, K>
	: VPick_3<O, K>

type VPick_3<O, K> = symbol extends keyof O
	? symbol extends K
		? PickPrecise_<O, K>
		: PickSimple_<O, K>
	: PickSimple_<O, K>
