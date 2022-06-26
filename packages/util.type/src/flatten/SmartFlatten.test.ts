/* eslint-disable no-magic-numbers */
import type { IsEqual, IsIdentical } from "../compare.js";
import { SimpleAssert } from "../SimpleAssert.js";
import type { SmartFlatten } from "./SmartFlatten.js";

describe("smartFlatten", () => {
	it("works", () => {
		expect.assertions(0);

		SimpleAssert<
			IsIdentical<SmartFlatten<{ a: 1 } & { b: 2 }>, { a: 1; b: 2 }>
		>();

		SimpleAssert<IsEqual<SmartFlatten<{ a?: 1 }>, { a?: 1 }>>();

		SimpleAssert<
			IsEqual<SmartFlatten<{ a?: 1 | undefined }>, { a?: 1 }>,
			false
		>();

		SimpleAssert<SmartFlatten<number>, number>();

		SimpleAssert<SmartFlatten<string>, string>();

		SimpleAssert<SmartFlatten<Date>, Date>();

		SimpleAssert<SmartFlatten<typeof Date>, typeof Date>();

		type Rec = Rec[] | string;

		SimpleAssert<IsIdentical<SmartFlatten<Rec>, Rec>>();
	});
});
