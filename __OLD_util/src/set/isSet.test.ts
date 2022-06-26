/* eslint-disable no-undefined */
import { isSet } from "./isSet.js";

describe("isSet", () => {
	it("works", () => {
		expect.hasAssertions();

		expect(isSet(new Set())).toBeTruthy();
		expect(isSet(new Map())).toBeFalsy();
		expect(isSet(new Date())).toBeFalsy();

		expect(isSet({})).toBeFalsy();
		expect(isSet(null)).toBeFalsy();
		expect(isSet(undefined)).toBeFalsy();
	});
});
