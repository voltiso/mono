/* eslint-disable no-magic-numbers */
import { Assert } from "../../bdd.js";
import { IsIdentical } from "../../misc/IsEqual.js";
import { DeepPartial } from "./DeepPartial.js";

describe("DeepPartial", () => {
	it("works", () => {
		expect.assertions(0);
		type X = DeepPartial<{
			x: 0;
			a: 1;
			obj: {
				a: 11;
			};
		}>;
		Assert<
			IsIdentical<
				X,
				{
					x?: 0;
					a?: 1;
					obj?: {
						a?: 11;
					};
				}
			>
		>();
	});
});
