import type { VoltisoError } from "./VoltisoError";

describe("VoltisoError", () => {
	it("works", () => {
		expect.hasAssertions();

		const error = new VoltisoError();
		expect(error.message).toBe("[@voltiso/util]");
	});
});
