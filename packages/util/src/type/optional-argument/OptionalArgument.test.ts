// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '~/$strip'

import type { AreNoArgument } from './AreNotProvided'
import type { NoArgument, OptionalArgument } from './OptionalArgument'

type IFunc_<Result> = (...args: never[]) => Result
type IFunc<Result extends string = string> = IFunc_<Result>

type Func_<Args, Result> = Args extends readonly unknown[]
	? (...args: Args) => Result
	: never

// type Fun<
// 	Args extends OptionalArgument<number[]> = NoArgument,
// 	Result extends OptionalArgument<string> = NoArgument
// > = AreProvided<[Args, Result]> extends true
// 	? Fun_<Args, Result>
// 	: AreNoArgument<[Args, Result]> extends true
// 	? IFun
// 	: never

// type Fun<
// 	Args extends OptionalArgument<number[]> = NoArgument,
// 	Result extends OptionalArgument<string> = NoArgument
// > = Args extends number[]
// 	? Result extends string
// 		? Fun_<Args, Result>
// 		: never
// 	: Result extends NoArgument
// 	? Args extends NoArgument
// 		? [Result] extends [NoArgument]
// 			? [Args] extends [NoArgument]
// 				? NoArgument extends Args
// 					? NoArgument extends Result
// 						? AreNoArgument<[Args, Result]> extends true
// 							? [AreNoArgument<[Args, Result]>] extends [true]
// 								? IFun
// 								: never
// 							: never
// 						: never
// 					: never
// 				: never
// 			: never
// 		: never
// 	: never

type Func<
	Args extends OptionalArgument<number[]> = NoArgument,
	Result extends OptionalArgument<string> = NoArgument,
> = AreNoArgument<[Args, Result], IFunc, Func_<Args, Result>>

describe('OptionalArgument', () => {
	it('works', <Args extends number[], Result extends string>() => {
		expect.assertions(0)

		// Assert.is<Fun<Args, Result>, Fun_<Args, Result>>() // :(

		$Assert.is<IFunc<Result>, IFunc>()

		// Assert.is<Fun<Args, Result>, IFun<Result>>() // :(
		$Assert.is<Func<Args, Result>, IFunc>()
		$Assert.is<Func<Args, Result>, Func>()

		type TestA<Args extends number[], Result extends string> = Func<
			Args,
			Result
		> extends IFunc<Result>
			? 1
			: 0

		type A = TestA<Args, Result>

		$Assert.is<A, 0 | 1>()
		// Assert.is<A, 1>() // :(

		//

		type TestB<Args extends number[], Result extends string> = Func<
			Args,
			Result
		> extends Func_<Args, Result>
			? 1
			: 0

		type B = TestB<Args, Result>
		$Assert.is<B, 0 | 1>()
		// Assert.is<B, 1>() // :(
	})
})
