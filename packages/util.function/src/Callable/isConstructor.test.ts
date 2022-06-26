/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable func-names */
import { isConstructor } from "./isConstructor.js";

describe("isConstructor", () => {
	it("works", () => {
		expect.hasAssertions();
		expect(isConstructor(Date)).toBeTruthy();
		expect(isConstructor(() => 0)).toBeFalsy();
		expect(isConstructor(function () {})).toBeTruthy();
	});
});
