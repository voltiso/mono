// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable es-x/no-global-this */

import type { And, Not, Or, Xor } from '~/boolean'
import type { IsNumber, IsSuperNumber } from '~/number'

import type { IsSubtype, IsSupertype } from '../compare'
import { UNSET } from '_/symbols/unset'

export type Default<X, DefaultType> = X extends UNSET ? DefaultType : X

export interface Operation<
	A = UNSET,
	B = UNSET,
	C = UNSET,
	D = UNSET,
	_E = UNSET,
	_F = UNSET,
	_G = UNSET,
	_H = UNSET,
	_I = UNSET,
> {
	'!': Not<A>

	'&': And<A, B>
	// '&': And<A, B, Default<C, true>, Default<D, false>>

	'^': Xor<A, B, Default<C, true>, Default<D, false>>
	isNumber: IsNumber<A, Default<B, true>, Default<C, false>>

	isString: IsString<A, Default<B, true>, Default<C, false>>
	isSubtype: IsSubtype<A, B, Default<C, true>, Default<D, false>>

	isSuperNumber: IsSuperNumber<A, Default<B, true>, Default<C, false>>
	isSuperString: IsSuperString<A, Default<B, true>, Default<C, false>>

	isSupertype: IsSupertype<A, B, Default<C, true>, Default<D, false>>

	'|': Or<A, B>
	// '|': Or<A, B, Default<C, true>, Default<D, false>>
}

export type IsString<A, T = true, F = false> = A extends string ? T : F
export type IsSuperString<A, T = true, F = false> = string extends A ? T : F

export type OperationPacked<args extends unknown[]> = [
	...args,
	UNSET,
	UNSET,
	UNSET,
	UNSET,
	UNSET,
	UNSET,
	UNSET,
	UNSET,
	UNSET,
	UNSET,
] extends [
	infer A,
	infer B,
	infer C,
	infer D,
	infer E,
	infer F,
	infer G,
	infer H,
	infer I,
	...unknown[],
]
	? Operation<A, B, C, D, E, F, G, H, I>
	: never
