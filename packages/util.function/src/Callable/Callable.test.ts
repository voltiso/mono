import { Assert, Is } from "../../bdd.js";
import { Callable } from "./Callable.js";

describe("Callable", () => {
	it("works", () => {
		expect.assertions(0);
		Assert.isSubtype<(x: number) => number, Callable>();

		Assert(
			Is<Callable>() //
				.identicalTo<(...args: never[]) => unknown>(),

			Is<Callable<[number, string]>>() //
				.identicalTo<(a: number, b: string) => unknown>(),

			Is<Callable<[], number>>() //
				.identicalTo<() => number>(),

			Is<Callable<[number], string, bigint>>() //
				.identicalTo<(this: bigint, a: number) => string>()
		);
	});
});
