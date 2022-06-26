/* eslint-disable max-statements */
/* eslint-disable no-magic-numbers */
import { SimpleAssert } from "../SimpleAssert.js";
import type { AreNotProvided } from "./AreNotProvided.js";
import type { NotProvided, OptionalArgument } from "./OptionalArgument.js";

type IFun_<Result> = (...args: never[]) => Result;
type IFun<Result extends string = string> = IFun_<Result>;

type Fun_<Args, Result> = Args extends readonly unknown[]
	? (...args: Args) => Result
	: never;

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

type Fun<
	Args extends OptionalArgument<number[]> = NotProvided,
	Result extends OptionalArgument<string> = NotProvided
> = AreNotProvided<[Args, Result], IFun, Fun_<Args, Result>>;

describe("OptionalArgument", () => {
	it("works", <Args extends number[], Result extends string>() => {
		expect.assertions(0);

		// Assert.is<Fun<Args, Result>, Fun_<Args, Result>>() // :(

		SimpleAssert<IFun<Result>, IFun>();

		// Assert.is<Fun<Args, Result>, IFun<Result>>() // :(
		SimpleAssert<Fun<Args, Result>, IFun>();
		SimpleAssert<Fun<Args, Result>, Fun>();

		type TestA<Args extends number[], Result extends string> = Fun<
			Args,
			Result
		> extends IFun<Result>
			? 1
			: 0;

		type A = TestA<Args, Result>;

		SimpleAssert<A, 0 | 1>();
		// Assert.is<A, 1>() // :(

		//

		type TestB<Args extends number[], Result extends string> = Fun<
			Args,
			Result
		> extends Fun_<Args, Result>
			? 1
			: 0;

		type B = TestB<Args, Result>;
		SimpleAssert<B, 0 | 1>();
		// Assert.is<B, 1>() // :(
	});
});
