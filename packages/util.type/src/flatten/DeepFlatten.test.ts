/* eslint-disable no-magic-numbers */
import type { IsIdentical } from "../compare.js";
import { SimpleAssert } from "../SimpleAssert.js";
import type { DeepFlatten } from "./DeepFlatten.js";

describe("deepFlatten", () => {
	it("works", () => {
		expect.assertions(0);

		SimpleAssert<
			IsIdentical<DeepFlatten<{ a: 1 } & { b: 2 }>, { a: 1; b: 2 }>
		>();

		SimpleAssert<IsIdentical<DeepFlatten<{ a?: 1 }>, { a?: 1 }>>();

		SimpleAssert<
			IsIdentical<DeepFlatten<{ a?: 1 | undefined }>, { a?: 1 }>,
			false
		>();

		SimpleAssert<IsIdentical<DeepFlatten<number>, number>>();
		SimpleAssert<IsIdentical<DeepFlatten<string>, string>>();
		SimpleAssert<IsIdentical<DeepFlatten<Date>, Date>>();
		SimpleAssert<IsIdentical<DeepFlatten<typeof Date>, typeof Date>>();
	});
});
