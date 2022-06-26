/* eslint-disable jest/no-commented-out-tests */
/* eslint-disable jest/expect-expect */
/* eslint-disable jest/prefer-expect-assertions */
import { Assert } from "../bdd.js";
import { IsIdentical } from "../misc/IsEqual.js";
import { Split } from "./Split.js";

describe("split", () => {
	it("simple", () => {
		type A = Split<"asd/sdf/dfg", "/">;
		Assert<IsIdentical<A, readonly ["asd", "sdf", "dfg"]>>();
	});

	it("non-literal", () => {
		type B = Split<string, "/">;
		Assert<IsIdentical<B, readonly string[]>>();
	});

	it("no separator specified", () => {
		type C = Split<"a/b">;
		Assert<IsIdentical<C, readonly ["a", "/", "b"]>>();
	});

	// not working:

	// it('non-literal extending string', () => {
	// 	type D = Split<string & { myExtension: () => void }>
	// 	Assert<IsIdentical<D, readonly string[]>>()
	// })

	// it('literal extending string', () => {
	// 	type E = Split<'a/b' & { myExtension: () => void }, '/'>
	// 	Assert<IsIdentical<E, readonly ['a', 'b']>>()
	// })
});
