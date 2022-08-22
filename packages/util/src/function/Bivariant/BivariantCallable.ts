// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type BivariantCallable_<Func> = [Func] extends [
	(...args: infer Args) => infer Res,
]
	? {
			bivarianceHack(...args: Args): Res
	  }['bivarianceHack']
	: never

export type BivariantCallable<Func extends (...args: any) => any> =
	BivariantCallable_<Func>

//

export type $BivariantCallable_<Func> = Func extends (
	...args: infer Args
) => infer Res
	? {
			bivarianceHack(...args: Args): Res
	  }['bivarianceHack']
	: never

export type $BivariantCallable<Func extends (...args: any) => any> =
	$BivariantCallable_<Func>
