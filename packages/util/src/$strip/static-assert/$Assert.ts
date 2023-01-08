// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-empty-function */

import { assertDev } from '_'

import type {
	IsCompatible,
	IsEqual,
	IsIdentical,
	IsNonStrictEqual,
	IsRelated,
} from '~/type'

interface Is<A, T = true, F = false> {
	<B>(_?: B): A extends B ? T : F
	bigint: IsIdentical<A, bigint, T, F>

	boolean: IsIdentical<A, boolean, T, F>
	compatibleWith<B>(_?: B): IsCompatible<A, B, T, F>
	equalTo<B>(_?: B): IsEqual<A, B, T, F>

	false: IsIdentical<A, false, T, F>

	// subtypeOf
	identicalTo<B>(_?: B): IsIdentical<A, B, T, F>
	nonStrictEqualTo<B>(_?: B): IsNonStrictEqual<A, B, T, F>

	not: Is<A, F, T>

	number: IsIdentical<A, number, T, F>
	object: IsIdentical<A, object, T, F>

	relatedTo<B>(_?: B): IsRelated<A, B, T, F>
	strictSubtypeOf<B>(_?: B): A extends B ? (B extends A ? F : T) : F
	string: IsIdentical<A, number, T, F>
	subtypeOf<B>(_?: B): A extends B ? T : F
	symbol: IsIdentical<A, symbol, T, F>
	true: IsIdentical<A, true, T, F>
}

const proxy: any = new Proxy(() => proxy as never, {
	get() {
		return proxy as never
	},
})

/** @strip */
export function $Is<T>(_?: T): Is<T> {
	assertDev()
	return proxy as never
}

// export const Type = Is

/** @internal */
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
	_Q extends true = true,
>(..._expects: true[]) {
	assertDev()
}

/** @internal */
const _AssertInterface = {
	/**
	 * IsSubtype
	 *
	 * @example
	 *
	 * ```ts
	 * Assert.is<123, number>()
	 * ```
	 */
	is<_A extends B, B>() {},

	isSubtype<_A extends B, B>() {},
	isSupertype<A, _B extends A>() {},
}

// eslint-disable-next-line etc/no-internal
Object.setPrototypeOf(_Assert, _AssertInterface)

/** @strip Use `@voltiso/transform/strip` to strip from production code */
// eslint-disable-next-line etc/no-internal
export const $Assert = _Assert as typeof _AssertInterface & typeof _Assert
