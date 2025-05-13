// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** @internal */
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class _NewableBivarianceHack<Args extends readonly unknown[]> {
	constructor(...args: Args) {
		// eslint-disable-next-line sonarjs/void-use
		void args
	}
}

/** @internal */
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
abstract class _NewableAbstractBivarianceHack<Args extends readonly unknown[]> {
	constructor(...args: Args) {
		// eslint-disable-next-line sonarjs/void-use
		void args
	}
}

// type A = object extends {a?: 1} ? 1 : 0

/** @internal */
export type _BivariantNewable<
	Args extends readonly unknown[],
	Return,
> = typeof _NewableBivarianceHack<Args> &
	(object extends Required<Return> ? unknown : new (...args: any) => Return)

/** @internal */
export type _BivariantAbstractNewable<
	Args extends readonly unknown[],
	Return,
> = typeof _NewableAbstractBivarianceHack<Args> &
	(abstract new (...args: any) => Return)

//

export type BivariantNewable_<Func> = [Func] extends [
	new (...args: infer Args) => infer Result,
]
	? _BivariantNewable<Args, Result>
	: [Func] extends [abstract new (...args: infer Args) => infer Result]
		? _BivariantAbstractNewable<Args, Result>
		: never

export type BivariantNewable<Func extends abstract new (...args: any) => any> =
	BivariantNewable_<Func>

//

export type $BivariantNewable_<Func> = Func extends any
	? BivariantNewable_<Func>
	: never

export type $BivariantNewable<Func extends abstract new (...args: any) => any> =
	$BivariantNewable_<Func>
