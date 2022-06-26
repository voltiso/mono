import { Assert } from "../bdd.js";
import { IsEqual } from "../misc/IsEqual.js";
import { Join } from "./Join.js";

describe("join", () => {
	it("works", () => {
		expect.assertions(0);
		Assert<IsEqual<Join<["asd", "sdf"], "/">, "asd/sdf">>();
		Assert<IsEqual<Join<["a", "b", "c", "d"], "/">, "a/b/c/d">>();
		Assert<IsEqual<Join<["a", "b", "c", "d"]>, "abcd">>();
		Assert<IsEqual<Join<["a", "b", "c", "d"], "">, "abcd">>();
	});
});
