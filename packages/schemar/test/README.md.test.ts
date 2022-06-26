import * as s from "../src/s.js";

describe("README.md", () => {
	it("bundlers / tree-shaking", () => {
		expect.hasAssertions();

		const mySchemable = {
			field: s.number,
		};

		const { isValid } = s.schema(mySchemable).tryValidate({ field: 123 });
		expect(isValid).toBeTruthy();
	});
});
