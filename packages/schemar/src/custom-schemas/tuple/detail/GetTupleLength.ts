// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable no-magic-numbers */

type GetArrayLength<A extends readonly unknown[]> = A extends readonly []
	? 0
	: A extends readonly [unknown]
	? 1
	: A extends readonly [unknown, unknown]
	? 2
	: A extends readonly [unknown, unknown, unknown]
	? 3
	: A extends readonly [unknown, unknown, unknown, unknown]
	? 4
	: A extends readonly [unknown, unknown, unknown, unknown, unknown]
	? 5
	: A extends readonly [unknown, unknown, unknown, unknown, unknown, unknown]
	? 6
	: A extends readonly [
			unknown,
			unknown,
			unknown,
			unknown,
			unknown,
			unknown,
			unknown,
	  ]
	? 7
	: A extends readonly unknown[]
	? number
	: never

export type GetTupleLength_<X> = X extends readonly unknown[]
	? GetArrayLength<X>
	: never
