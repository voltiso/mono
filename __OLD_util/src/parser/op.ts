/* eslint-disable @typescript-eslint/no-unused-vars */
import { And } from '../boolean/And'
import { Or } from '../boolean/Or'
import { IsFalsy } from '../boolean/truthy-falsy'
import { Xor } from '../boolean/Xor'
import { IsSubtype, IsSupertype } from '../misc/IsSubtype'
import { IsNumber, IsSuperNumber } from '../number'

declare const _def: unique symbol
export type def = typeof _def
export type Def<x, d> = x extends def ? d : x

export interface Op<
	A = def,
	B = def,
	C = def,
	D = def,
	_E = def,
	_F = def,
	_G = def,
	_H = def,
	_I = def
> {
	'!': IsFalsy<A, Def<B, true>, Def<C, false>>
	'&': And<A, B, Def<C, true>, Def<D, false>>
	'|': Or<A, B, Def<C, true>, Def<D, false>>
	'^': Xor<A, B, Def<C, true>, Def<D, false>>

	'isSubtype': IsSubtype<A, B, Def<C, true>, Def<D, false>>
	'isSupertype': IsSupertype<A, B, Def<C, true>, Def<D, false>>

	'isString': IsString<A, Def<B, true>, Def<C, false>>
	'isSuperString': IsSuperString<A, Def<B, true>, Def<C, false>>

	'isNumber': IsNumber<A, Def<B, true>, Def<C, false>>
	'isSuperNumber': IsSuperNumber<A, Def<B, true>, Def<C, false>>
}

export type IsString<A, T = true, F = false> = A extends string ? T : F
export type IsSuperString<A, T = true, F = false> = string extends A ? T : F

export type OpPacked<args extends unknown[]> = [
	...args,
	def,
	def,
	def,
	def,
	def,
	def,
	def,
	def,
	def,
	def
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
	...unknown[]
]
	? Op<A, B, C, D, E, F, G, H, I>
	: never
