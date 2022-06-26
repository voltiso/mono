import type { IsIdentical } from "./compare.js";
import type { OptionalFromUndefined } from "./OptionalFromUndefined.js";
import { SimpleAssert } from "./SimpleAssert.js";

describe("OptionalFromUndefined", () => {
	it("works", () => {
		expect.assertions(0);

		SimpleAssert<
			IsIdentical<
				OptionalFromUndefined<{
					a: number;
					b: string | undefined;
					c?: string;
					d?: string | undefined;
				}>,
				{ a: number; b?: string; c?: string; d?: string }
			>
		>();

		SimpleAssert<
			IsIdentical<
				OptionalFromUndefined<{
					a: undefined;
				}>,
				{ a?: never }
			>
		>();
	});
});
