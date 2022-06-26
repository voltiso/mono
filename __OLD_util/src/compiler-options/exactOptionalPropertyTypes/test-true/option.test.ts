import { Assert } from "../../../bdd.js";
import { exactOptionalPropertyTypes } from "../../exactOptionalPropertyTypes.js";

describe("exactOptionalPropertyTypes - true", () => {
	it("works", () => {
		expect.assertions(0);
		Assert<exactOptionalPropertyTypes>();
	});
});
