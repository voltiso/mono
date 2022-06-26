import { Assert } from "../../../bdd.js";
import { strictNullChecks } from "../../strictNullChecks.js";

describe("Have_strictNullChecks", () => {
	it("works", () => {
		expect.assertions(0);
		Assert<strictNullChecks>();
	});
});
