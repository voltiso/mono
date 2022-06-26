/* eslint-disable no-magic-numbers */
import { Assert } from "../bdd.js";
import { def, Def } from "./op.js";

describe("def", () => {
	it("works", () => {
		expect.assertions(0);
		Assert.isSubtype<Def<def, 123>, 123>();
		Assert.isSubtype<Def<1, 2>, 1>();
	});
});
