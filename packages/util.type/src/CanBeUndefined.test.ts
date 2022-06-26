/* eslint-disable no-magic-numbers */
import type { CanBeUndefined } from "./CanBeUndefined.js";
import { SimpleAssert } from "./SimpleAssert.js";

describe("canBeUndefined", () => {
	it("works", () => {
		expect.assertions(0);

		SimpleAssert<CanBeUndefined<{ x: 0; a: 1 }, "a">, false>();
		SimpleAssert<CanBeUndefined<{ x: 0; a: 1 | undefined }, "a">, true>();
		SimpleAssert<CanBeUndefined<{ x: 0; a?: 1 }, "a">, false>();
		SimpleAssert<CanBeUndefined<{ x: 0; a?: 1 | undefined }, "a">, true>();

		SimpleAssert<CanBeUndefined<{ x: 0; a: 1 }, "a">, false>();
		SimpleAssert<CanBeUndefined<{ x: 0; a: 1 | undefined }, "a">, true>();
		SimpleAssert<CanBeUndefined<{ x: 0; a?: 1 }, "a">, false>();
		SimpleAssert<CanBeUndefined<{ x: 0; a?: 1 | undefined }, "a">, true>();
	});

	it("generics", <T extends { a?: 1 }>() => {
		expect.assertions(0);

		type A0 = CanBeUndefined<{ a?: 1 }, "a">;
		SimpleAssert<A0, false>();

		type A1 = CanBeUndefined<{ a?: 1 }, "a">;
		SimpleAssert<A1, false>();

		//

		type B0 = CanBeUndefined<T, "a">;
		SimpleAssert<B0, false>();

		type B1 = CanBeUndefined<T, "a">;
		SimpleAssert<B1, false>();
	});
});
