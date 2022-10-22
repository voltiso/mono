// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { And, IsFalsy, Or, Xor } from '~/boolean'
import type { IsNumber, IsSuperNumber } from '~/number'

import type { IsSubtype, IsSupertype } from '../compare'

declare const _unset: unique symbol
export type Unset = typeof _unset

export type Default<X, DefaultType> = X extends Unset ? DefaultType : X

export interface Operation<
	A = Unset,
	B = Unset,
	C = Unset,
	D = Unset,
	_E = Unset,
	_F = Unset,
	_G = Unset,
	_H = Unset,
	_I = Unset,
> {
	'!': IsFalsy<A, Default<B, true>, Default<C, false>>
	'&': And<A, B, Default<C, true>, Default<D, false>>
	'^': Xor<A, B, Default<C, true>, Default<D, false>>
	isNumber: IsNumber<A, Default<B, true>, Default<C, false>>

	isString: IsString<A, Default<B, true>, Default<C, false>>
	isSubtype: IsSubtype<A, B, Default<C, true>, Default<D, false>>

	isSuperNumber: IsSuperNumber<A, Default<B, true>, Default<C, false>>
	isSuperString: IsSuperString<A, Default<B, true>, Default<C, false>>

	isSupertype: IsSupertype<A, B, Default<C, true>, Default<D, false>>
	'|': Or<A, B, Default<C, true>, Default<D, false>>
}

export type IsString<A, T = true, F = false> = A extends string ? T : F
export type IsSuperString<A, T = true, F = false> = string extends A ? T : F

export type OperationPacked<args extends unknown[]> = [
	...args,
	Unset,
	Unset,
	Unset,
	Unset,
	Unset,
	Unset,
	Unset,
	Unset,
	Unset,
	Unset,
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
