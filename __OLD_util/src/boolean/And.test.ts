import { And } from "./And.js";

describe("and", () => {
	it("works", () => {
		expect.assertions(0);
		Assert(
			Is<And<true, true>>() //
				.identicalTo<true>(),

			Is<And<true, false>>() //
				.identicalTo<false>(),

			Is<And<false, boolean>>() //
				.identicalTo<false>(),

			Is<And<true, boolean>>() //
				.identicalTo<boolean>(),

			Is<And<boolean, boolean>>() //
				.identicalTo<boolean>()
		);
	});
});
