import { Assert } from "../../../bdd.js";
import { IsIdentical } from "../../../misc/IsEqual.js";
import { OmitCall } from "./OmitCall.js";

describe("OmitCall", () => {
	it("works", () => {
		expect.assertions(0);
		type X = OmitCall<{
			new (x: number): number;
			(x: number): number;
			[k: string]: number;
			num: number;
		}>;
		Assert<IsIdentical<X, { [k: string]: number; num: number }>>();
	});
});
