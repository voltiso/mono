import { Assert, Is } from "../../bdd.js";
import { Newable } from "./Newable.js";

describe("Newable", () => {
	it("works", () => {
		expect.assertions(0);
		Assert.isSubtype<abstract new (x: number) => number, Newable>();
		Assert.isSubtype<new (x: number) => number, Newable>();

		Assert(
			Is<Newable>() //
				.identicalTo<abstract new (...args: never[]) => unknown>(),

			Is<Newable<[number, string]>>() //
				.identicalTo<abstract new (a: number, b: string) => unknown>(),

			Is<Newable<[], number>>() //
				.identicalTo<abstract new () => number>()
		);
	});
});
