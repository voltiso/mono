// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { NoParameter } from './TypeAliases'

/** Augment with `0-ary` type aliases */
export interface TypeAliases0 {
	Echo0: []
}

/** Augment with `1-ary` type aliases */
export interface TypeAliases1<_1> extends TypeAliases2<_1, NoParameter> {
	Echo1: [_1]
}

/** Augment with `2-ary` type aliases */
export interface TypeAliases2<_1, _2>
	extends TypeAliases3<_1, _2, NoParameter> {
	Echo2: [_1, _2]
}

/** Augment with `3-ary` type aliases */
export interface TypeAliases3<_1, _2, _3>
	extends TypeAliases4<_1, _2, _3, NoParameter> {
	Echo3: [_1, _2, _3]
}

/** Augment with `4-ary` type aliases */
export interface TypeAliases4<_1, _2, _3, _4>
	extends TypeAliases5<_1, _2, _3, _4, NoParameter> {
	Echo4: [_1, _2, _3, _4]
}

/** Augment with `5-ary` type aliases */
export interface TypeAliases5<_1, _2, _3, _4, _5>
	extends TypeAliases6<_1, _2, _3, _4, _5, NoParameter> {
	Echo5: [_1, _2, _3, _4, _5]
}

/** Augment with `6-ary` type aliases */
export interface TypeAliases6<_1, _2, _3, _4, _5, _6>
	extends TypeAliases7<_1, _2, _3, _4, _5, _6, NoParameter> {
	Echo6: [_1, _2, _3, _4, _5, _6]
}

/** Augment with `7-ary` type aliases */
export interface TypeAliases7<_1, _2, _3, _4, _5, _6, _7>
	extends TypeAliases8<_1, _2, _3, _4, _5, _6, _7, NoParameter> {
	Echo7: [_1, _2, _3, _4, _5, _6, _7]
}

/** Augment with `8-ary` type aliases */
export interface TypeAliases8<_1, _2, _3, _4, _5, _6, _7, _8>
	extends TypeAliases9<_1, _2, _3, _4, _5, _6, _7, _8, NoParameter> {
	Echo8: [_1, _2, _3, _4, _5, _6, _7, _8]
}

/** Augment with `9-ary` type aliases */
export interface TypeAliases9<_1, _2, _3, _4, _5, _6, _7, _8, _9> {
	Echo9: [_1, _2, _3, _4, _5, _6, _7, _8, _9]
}
