import { Assert } from "../bdd.js";
import { Tokenize } from "./tokenize.js";

describe("tokenize", () => {
	it("works", () => {
		expect.assertions(0);
		Assert.isSubtype<
			Tokenize<"isString 1 & !isString 2">,
			["isString", "1", "&", "!", "isString", "2"]
		>();
	});
});
