/* eslint-disable no-magic-numbers */
import { Assert } from "../bdd.js";
import { IsEqual } from "../misc/IsEqual.js";
import { ReplaceIf } from "./Replace.js";

describe("replace", () => {
	it("works", () => {
		expect.assertions(0);
		// Assert.isSubtype<ReplaceIf<number, 123, 'isNumber'>, 123>()
		Assert<
			IsEqual<
				ReplaceIf<["sdf", 2, 1, "dfg", 2], 10, "isString">,
				[10, 2, 1, 10, 2]
			>
		>();
		Assert<
			IsEqual<
				ReplaceIf<[string, "a", "x"], null, "isSuperString">,
				[null, "a", "x"]
			>
		>();
		Assert<
			IsEqual<
				ReplaceIf<["", "asd", 0, 123], "TEST", "isNumber 1 & !!1">,
				["", "asd", 0, "TEST"]
			>
		>();
	});
});
