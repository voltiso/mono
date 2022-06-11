/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import {
	IsCompatible,
	IsEqual,
	IsIdentical,
	IsNonStrictEqual,
	IsRelated,
} from '../../IsEqual'
import { protoLink } from '../class'

interface Is<A, T = true, F = false> {
	<B>(_?: B): A extends B ? T : F // subtypeOf
	identicalTo<B>(_?: B): IsIdentical<A, B, T, F>

	compatibleWith<B>(_?: B): IsCompatible<A, B, T, F>
	equalTo<B>(_?: B): IsEqual<A, B, T, F>
	nonStrictEqualTo<B>(_?: B): IsNonStrictEqual<A, B, T, F>

	relatedTo<B>(_?: B): IsRelated<A, B, T, F>

	subtypeOf<B>(_?: B): A extends B ? T : F
	strictSubtypeOf<B>(_?: B): A extends B ? (B extends A ? F : T) : F

	// is: Is<A, T, F>

	not: Is<A, F, T>

	true: IsIdentical<A, true, T, F>
	false: IsIdentical<A, false, T, F>

	boolean: IsIdentical<A, boolean, T, F>
	number: IsIdentical<A, number, T, F>
	string: IsIdentical<A, number, T, F>
	object: IsIdentical<A, object, T, F>
	bigint: IsIdentical<A, bigint, T, F>
	symbol: IsIdentical<A, symbol, T, F>
}

export type { Is as Predicates }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const proxy: any = new Proxy(() => proxy, {
	get() {
		return proxy
	},
})

export function Is<T>(_?: T): Is<T> {
	return proxy
}

// export const Type = Is

function _Assert<
	_A extends true = true,
	_B extends true = true,
	_C extends true = true,
	_D extends true = true,
	_E extends true = true,
	_F extends true = true,
	_G extends true = true,
	_H extends true = true,
	_I extends true = true,
	_J extends true = true,
	_K extends true = true,
	_L extends true = true,
	_M extends true = true,
	_N extends true = true,
	_O extends true = true,
	_P extends true = true,
	_Q extends true = true
>(..._expects: true[]) {
	//
}

export const Assert = protoLink(_Assert, {
	is<_A extends B, B>() {},
	isSubtype<_A extends B, B>() {},
	isSupertype<A, _B extends A>() {},
})
