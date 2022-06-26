/* eslint-disable no-magic-numbers */
import { Assert } from "../../../../bdd.js";
import { IsIdentical } from "../../../../misc/IsEqual.js";
import { nest } from "./nest.js";

describe("Nest", () => {
	it("works", () => {
		expect.hasAssertions();

		const a = nest(123, [] as const);
		expect(a).toBe(123);
		Assert<IsIdentical<typeof a, 123>>();

		const x = nest(123, ["a", "b", 3] as const);
		expect(x).toStrictEqual({ a: { b: { 3: 123 } } });
		Assert<IsIdentical<typeof x, { a: { b: { [3]: 123 } } }>>();
	});
});
