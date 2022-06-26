import { Assert } from "../../../bdd.js";
import { IsIdentical } from "../../../misc/IsEqual.js";
import { OmitValues } from "./OmitValues.js";

describe("OmitValues", () => {
	it("works", () => {
		expect.assertions(0);

		type X = OmitValues<
			{
				num: number;
				fff: never;
				ggg?: never;
			},
			undefined
		>;

		Assert<IsIdentical<X, { num: number }>>();
	});
});
