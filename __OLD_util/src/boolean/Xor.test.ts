import { Assert, Is } from "../bdd/Assert.js";
import { Xor } from "./Xor.js";

describe("xor", () => {
	it("works", () => {
		expect.assertions(0);

		Assert(
			Is<Xor<false, true>>() //
				.identicalTo<true>(),

			Is<Xor<true, false>>() //
				.identicalTo<true>(),

			Is<Xor<true, true>>() //
				.identicalTo<false>(),

			Is<Xor<false, false>>() //
				.identicalTo<false>(),

			Is<Xor<false, boolean>>() //
				.identicalTo<boolean>(),

			Is<Xor<true, boolean>>() //
				.identicalTo<boolean>()
		);
	});
});
