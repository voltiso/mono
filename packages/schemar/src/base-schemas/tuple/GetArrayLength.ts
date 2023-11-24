// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable no-magic-numbers */

/** @internal */
export type _GetArrayLength<Arr extends readonly unknown[]> =
	Arr extends readonly []
		? 0
		: Arr extends readonly [unknown]
		  ? 1
		  : Arr extends readonly [unknown, unknown]
		    ? 2
		    : Arr extends readonly [unknown, unknown, unknown]
		      ? 3
		      : Arr extends readonly [unknown, unknown, unknown, unknown]
		        ? 4
		        : Arr extends readonly [unknown, unknown, unknown, unknown, unknown]
		          ? 5
		          : Arr extends readonly [
										unknown,
										unknown,
										unknown,
										unknown,
										unknown,
										unknown,
		              ]
		            ? 6
		            : Arr extends readonly [
											unknown,
											unknown,
											unknown,
											unknown,
											unknown,
											unknown,
											unknown,
		                ]
		              ? 7
		              : Arr extends readonly unknown[]
		                ? number
		                : never

/** @internal */
export type _GetArrayLength_<X> = X extends readonly unknown[]
	? // eslint-disable-next-line etc/no-internal
	  _GetArrayLength<X>
	: never
