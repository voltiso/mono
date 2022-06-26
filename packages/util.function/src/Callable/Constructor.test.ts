import { Assert, Is } from "../../bdd.js";
import { Constructor } from "./Constructor.js";

describe("Constructor", () => {
	it("works", () => {
		expect.assertions(0);
		Assert.isSubtype<new (x: number) => { a: 0 }, Constructor>();

		Assert(
			Is<Constructor<[number, string], { a: 0 }>["prototype"]>() //
				.identicalTo<{ a: 0 }>()
		);
	});
});
