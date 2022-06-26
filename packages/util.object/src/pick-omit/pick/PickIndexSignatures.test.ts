/* eslint-disable no-magic-numbers */
import { Assert } from "../../../bdd.js";
import { IsIdentical } from "../../../misc/IsEqual.js";
import { PickIndexSignatures } from "./PickIndexSignatures.js";

describe("PickIndexSignatures", () => {
	it("works", () => {
		expect.assertions(0);

		type X = PickIndexSignatures<{
			new (x: number): number;
			(x: number): number;
			[k: string]: number;
			[k: number]: 123;
			[k: symbol]: "asd";
			num: number;
		}>;
		Assert<
			IsIdentical<
				X,
				{
					[k: string]: number;
					[k: number]: 123;
					[k: symbol]: "asd";
				}
			>
		>();
	});
});
