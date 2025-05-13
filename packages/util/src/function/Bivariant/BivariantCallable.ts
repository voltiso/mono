// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type BivariantCallable_<Func> = [Func] extends [
	(this: infer This, ...args: infer Args) => infer Res,
]
	? unknown extends This
		? {
				bivarianceHack(...args: Args): Res
			}['bivarianceHack']
		: {
				bivarianceHack(this: This, ...args: Args): Res
			}['bivarianceHack']
	: never

export type BivariantCallable<Func extends (...args: any) => any> =
	BivariantCallable_<Func>

//

export type $BivariantCallable_<Func> = Func extends any
	? BivariantCallable_<Func>
	: never

export type $BivariantCallable<Func extends (...args: any) => any> =
	$BivariantCallable_<Func>
