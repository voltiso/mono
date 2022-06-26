/* eslint-disable no-magic-numbers */
import { IsIdentical } from "../../../misc/IsEqual.js";
import { Assert } from "../../../bdd.js";
import { pickIfPresent } from "./pickIfPresent.js";

describe("pickIfPresent", () => {
	it("throws on non-existing keys", () => {
		expect.hasAssertions();

		const obj = {
			a: 1,
			b: 2,
		} as {
			a?: 1;
			readonly b?: 2;
			c?: 3;
			readonly d: 4;
			e: 5;
		};

		const r = pickIfPresent(obj, "b", "c", "d", "e", "nonExisting");
		expect(r).toStrictEqual({ b: 2 });
		expect(obj).toStrictEqual({ a: 1, b: 2 });

		Assert<
			IsIdentical<
				typeof r,
				{
					readonly b?: 2;
					c?: 3;
					readonly d: 4;
					e: 5;
					readonly nonExisting?: unknown;
				}
			>
		>();
	});
});
