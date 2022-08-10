// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type Bivariant_<Func> = [Func] extends [
	(...args: infer Args) => infer Res,
]
	? {
			bivarianceHack(...args: Args): Res
	  }['bivarianceHack']
	: never

export type Bivariant<Func extends (...args: any) => any> = Bivariant_<Func>

//

export type $Bivariant_<Func> = Func extends (...args: infer Args) => infer Res
	? {
			bivarianceHack(...args: Args): Res
	  }['bivarianceHack']
	: never

export type $Bivariant<Func extends (...args: any) => any> = $Bivariant_<Func>

//

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
