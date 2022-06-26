/* eslint-disable no-magic-numbers */
import { runAsync, runSync, SyncerFunction } from "../src.js";
import { Assert } from "@voltiso/stester";
import type { IsIdentical } from "@voltiso/util.type";
import { fib } from "./fib.js";

describe("fib", () => {
	it("type", () => {
		expect.assertions(0);
		Assert<IsIdentical<typeof fib, SyncerFunction<[number], number, number>>>();
	});

	it("sync", () => {
		expect.hasAssertions();

		expect(runSync(fib(10))).toBe(55);
	});

	it("async", async () => {
		expect.hasAssertions();

		await expect(runAsync(fib(10))).resolves.toBe(55);
	});
});
