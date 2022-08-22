// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

//

//

class BivariantNewableImpl<
	Args extends unknown[] = unknown[],
	Result = unknown,
> {
	// @ts-expect-error well...
	bivarianceHack = class BivarianceHack extends (0 as unknown as abstract new (
		...args: Args
	) => Result) {
		// eslint-disable-next-line no-useless-constructor
		constructor(...args: Args) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			super(...args)
		}
	}
}

//

export type BivariantNewable_<Func> = [Func] extends [
	abstract new (...args: infer Args) => infer Result,
]
	? BivariantNewableImpl<Args, Result>['bivarianceHack']
	: never

export type BivariantNewable<Func extends abstract new (...args: any) => any> =
	BivariantNewable_<Func>

//

export type $BivariantNewable_<Func> = Func extends abstract new (
	...args: infer Args
) => infer Result
	? BivariantNewableImpl<Args, Result>['bivarianceHack']
	: never

export type $BivariantNewable<Func extends abstract new (...args: any) => any> =
	$BivariantNewable_<Func>

// export type BivariantNewable_<Func> = [Func] extends [
// 	abstract new (...args: infer Args) => infer Res,
// ]
// 	? { new (...args: Args): Res }
// 	: never

// abstract class BivarianceHack<Args extends unknown[], Res> {
// 	// eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
// 	constructor(...args: Args) {}
// }

// export type BivariantNewable<Args extends unknown[], Res> = typeof BivarianceHack<
// 	Args,
// 	Res
// >

// type CC = typeof C

// export interface BivariantNewable<Args extends unknown[], Res> {
// 	new (...args: Args): Res
// }

// export type BivariantNewable_<Args, Res> = BivariantNewable<
// 	Args extends any[] ? Args : Args & unknown[],
// 	Res
// >
