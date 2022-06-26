/* eslint-disable max-statements */
/* eslint-disable no-magic-numbers */
import { SimpleAssert } from "../SimpleAssert.js";
import type {
	NotProvidedNN,
	OptionalArgumentNN,
	ProvidedNN,
} from "./OptionalArgumentNN";

type IFun_<Result> = (...args: never[]) => Result;
type IFun<Result extends string = string> = IFun_<Result>;

type Fun_<Args, Result> = Args extends readonly unknown[]
	? (...args: Args) => Result
	: never;

type Fun<
	Args extends OptionalArgumentNN<number[]> = NotProvidedNN,
	Result extends OptionalArgumentNN<string> = NotProvidedNN
> = Args extends ProvidedNN
	? Result extends ProvidedNN
		? Fun_<Args, Result>
		: never
	: Args extends NotProvidedNN
	? Result extends NotProvidedNN
		? IFun
		: never
	: never;

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
