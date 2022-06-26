import { Assert } from "../../../bdd.js";
import { IsIdentical } from "../../../misc/IsEqual.js";
import { PickCallNoUnknown } from "./PickCall.js";

describe("PickCall", () => {
	it("PickCallNoUnknown", () => {
		expect.assertions(0);
		type X = PickCallNoUnknown<{
			new (x: number): string;
			(x: number): number;
			[k: string]: number;
			num: number;
		}>;
		Assert<
			IsIdentical<
				X,
				{
					(x: number): number;
				}
			>
		>();
	});
});
