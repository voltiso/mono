/* eslint-disable no-undefined */
/* eslint-disable no-magic-numbers */
/* eslint-disable @typescript-eslint/no-empty-function */
import { isPrimitive } from "./Primitive.js";

describe("Primitive", () => {
	it("works", () => {
		expect.hasAssertions();
		expect(isPrimitive("a")).toBeTruthy();
		expect(isPrimitive(1)).toBeTruthy();
		expect(isPrimitive(BigInt(123))).toBeTruthy();
		expect(isPrimitive(Symbol("dfg"))).toBeTruthy();
		expect(isPrimitive(undefined)).toBeTruthy();
		expect(isPrimitive(false)).toBeTruthy();
		expect(isPrimitive({})).toBeFalsy();
		expect(isPrimitive(() => {})).toBeFalsy();
	});
});
