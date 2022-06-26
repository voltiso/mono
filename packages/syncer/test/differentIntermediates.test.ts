/* eslint-disable no-magic-numbers */
import { Assert } from "@voltiso/stester";
import type { IsIdentical } from "@voltiso/util.type";
import { runAsync, runSync, SyncerFunction } from "../src.js";
import { differentIntermediates } from "./differentIntermediates.js";

describe("splitAndFib", () => {
	it("type", () => {
		expect.assertions(0);
		Assert<
			IsIdentical<
				typeof differentIntermediates,
				SyncerFunction<[string, number], number>
			>
		>();
	});

	it("sync", () => {
		expect.hasAssertions();

		const r = runSync(differentIntermediates("my", 5));
		expect(r).toBe(44);
	});

	it("async", async () => {
		expect.hasAssertions();

		const r = await runAsync(differentIntermediates("my", 5));
		expect(r).toBe(44);
	});
});
