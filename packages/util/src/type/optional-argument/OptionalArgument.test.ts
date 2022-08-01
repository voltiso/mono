// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '~/type'

import type { AreNotProvided } from './AreNotProvided'
import type { NotProvided, OptionalArgument } from './OptionalArgument'

type IFunc_<Result> = (...args: never[]) => Result
type IFunc<Result extends string = string> = IFunc_<Result>

type Func_<Args, Result> = Args extends readonly unknown[]
	? (...args: Args) => Result
	: never

// type Fun<
// 	Args extends OptionalArgument<number[]> = NotProvided,
// 	Result extends OptionalArgument<string> = NotProvided
// > = AreProvided<[Args, Result]> extends true
// 	? Fun_<Args, Result>
// 	: AreNotProvided<[Args, Result]> extends true
// 	? IFun
// 	: never

// type Fun<
// 	Args extends OptionalArgument<number[]> = NotProvided,
// 	Result extends OptionalArgument<string> = NotProvided
// > = Args extends number[]
// 	? Result extends string
// 		? Fun_<Args, Result>
// 		: never
// 	: Result extends NotProvided
// 	? Args extends NotProvided
// 		? [Result] extends [NotProvided]
// 			? [Args] extends [NotProvided]
// 				? NotProvided extends Args
// 					? NotProvided extends Result
// 						? AreNotProvided<[Args, Result]> extends true
// 							? [AreNotProvided<[Args, Result]>] extends [true]
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
	Args extends OptionalArgument<number[]> = NotProvided,
	Result extends OptionalArgument<string> = NotProvided,
> = AreNotProvided<[Args, Result], IFunc, Func_<Args, Result>>

describe('OptionalArgument', () => {
	it('works', <Args extends number[], Result extends string>() => {
		expect.assertions(0)

		// Assert.is<Fun<Args, Result>, Fun_<Args, Result>>() // :(

		Assert.is<IFunc<Result>, IFunc>()

		// Assert.is<Fun<Args, Result>, IFun<Result>>() // :(
		Assert.is<Func<Args, Result>, IFunc>()
		Assert.is<Func<Args, Result>, Func>()

		type TestA<Args extends number[], Result extends string> = Func<
			Args,
			Result
		> extends IFunc<Result>
			? 1
			: 0

		type A = TestA<Args, Result>

		Assert.is<A, 0 | 1>()
		// Assert.is<A, 1>() // :(

		//

		type TestB<Args extends number[], Result extends string> = Func<
			Args,
			Result
		> extends Func_<Args, Result>
			? 1
			: 0

		type B = TestB<Args, Result>
		Assert.is<B, 0 | 1>()
		// Assert.is<B, 1>() // :(
	})
})
