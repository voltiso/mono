import { IsIdentical } from "../../misc/IsEqual.js";
import { Assert } from "../../bdd.js";
import { Mutable } from "./Mutable.js";

describe("Mutable", () => {
	it("type", () => {
		expect.assertions(0);

		type A = { a: "aa"; b?: "bb"; readonly c: "cc"; readonly d?: "dd" };
		type AA = Mutable<A>;
		Assert<IsIdentical<AA, { a: "aa"; b?: "bb"; c: "cc"; d?: "dd" }>>();
	});
});
