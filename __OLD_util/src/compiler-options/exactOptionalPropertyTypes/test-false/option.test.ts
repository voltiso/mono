import { Assert } from "../../../bdd.js";
import { Not } from "../../../boolean.js";
import { exactOptionalPropertyTypes } from "../exactOptionalPropertyTypes.js";

describe("exactOptionalPropertyTypes - false", () => {
	it("works", () => {
		expect.assertions(0);
		Assert<Not<exactOptionalPropertyTypes>>();
	});
});
