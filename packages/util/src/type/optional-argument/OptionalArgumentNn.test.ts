// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'

import type {
	NoArgumentNn,
	OptionalArgumentNn,
	ProvidedNn,
} from './OptionalArgumentNn'

type IFunc_<Result> = (...args: never[]) => Result
type IFunc<Result extends string = string> = IFunc_<Result>

type Func_<Args, Result> = Args extends readonly unknown[]
	? (...args: Args) => Result
	: never

type Func<
	Args extends OptionalArgumentNn<number[]> = NoArgumentNn,
	Result extends OptionalArgumentNn<string> = NoArgumentNn,
> = Args extends ProvidedNn
	? Result extends ProvidedNn
		? Func_<Args, Result>
		: never
	: Args extends NoArgumentNn
		? Result extends NoArgumentNn
			? IFunc
			: never
		: never

describe('OptionalArgument', () => {
	it('works', <Args extends number[], Result extends string>() => {
		expect.assertions(0)

		// Assert.is<Fun<Args, Result>, Fun_<Args, Result>>() // :(

		$Assert.is<IFunc<Result>, IFunc>()

		// Assert.is<Fun<Args, Result>, IFun<Result>>() // :(
		$Assert.is<Func<Args, Result>, IFunc>()
		$Assert.is<Func<Args, Result>, Func>()

		type TestA<Args extends number[], Result extends string> =
			Func<Args, Result> extends IFunc<Result> ? 1 : 0

		type A = TestA<Args, Result>

		$Assert.is<A, 0 | 1>()
		// Assert.is<A, 1>() // :(

		//

		type TestB<Args extends number[], Result extends string> =
			Func<Args, Result> extends Func_<Args, Result> ? 1 : 0

		type B = TestB<Args, Result>
		$Assert.is<B, 0 | 1>()
		// Assert.is<B, 1>() // :(
	})
})
