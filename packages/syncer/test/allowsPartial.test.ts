/* eslint-disable jest/no-conditional-in-test */
/* eslint-disable no-magic-numbers */
import { runAsync, runSync, SyncerIterator } from "../src.js";
import { partialFun } from "./allowsPartial.js";

describe("allowsPartial", () => {
	it("sync", () => {
		expect.hasAssertions();

		const r = runSync(partialFun());
		expect(r).toBe(100);
	});

	it("async", async () => {
		expect.hasAssertions();

		const r = await runAsync(partialFun());
		expect(r).toBe(111);
	});

	it("type - does not allow partial if Intermediate cannot be undefined", () => {
		expect.assertions(0);

		void function* partialFun(): SyncerIterator<number, number> {
			// @ts-expect-error partial!
			const x = yield {
				async: () => 11,
			};

			return 100 + (x || 0);
		};
	});
});
