import { runAsync, runSync, syncer } from "../src";

describe("onAsyncStart", () => {
	let anotherFunFlag = false;

	const anotherFun = syncer(function* () {
		anotherFunFlag = true;
		return "hi";
	});

	const fun = syncer(function* () {
		const r = yield {
			syncerIterator: anotherFun(),
			onAsyncStart: () => {
				expect(anotherFunFlag).toBe(false);
			},
		};
		expect(anotherFunFlag).toBe(true);
		return r + "!";
	});

	it("sync", () => {
		expect.hasAssertions();
		const r = runSync(fun());
		expect(r).toBe("hi!");
	});

	it("async", async () => {
		expect.hasAssertions();
		const r = await runAsync(fun());
		expect(r).toBe("hi!");
	});
});
