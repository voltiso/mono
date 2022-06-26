import { Assert } from "../bdd.js";
import { IsEqual } from "../misc/IsEqual.js";
import { Includes } from "./Includes.js";

describe("Includes", () => {
	it("works", () => {
		expect.assertions(0);

		Assert<Includes<"qwerty", "wer">>();
		Assert.isSubtype<Includes<"banana", "nano">, false>();
		Assert<IsEqual<Includes<string, "asd">, boolean>>();
		Assert<IsEqual<Includes<"asd", string>, boolean>>();
	});
});
