/* eslint-disable max-statements */
/* eslint-disable no-magic-numbers */
import { IsIdentical } from "../../../misc/IsEqual.js";
import { Assert } from "../../../bdd.js";
import { PickOptional } from "./PickOptional.js";

describe("PickOptional", () => {
	it("type", () => {
		expect.assertions(0);

		type A = PickOptional<{ readonly a?: "a"; b: "b" }>;
		Assert<IsIdentical<A, { readonly a?: "a" }>>();
	});

	type ObjA = {
		readonly a?: "aa";
		b: "bb";
	};

	it("generic", <O extends ObjA>() => {
		expect.assertions(0);

		type A = PickOptional<O>;
		Assert.is<O, A>();
	});

	it("vscode jump to definition (manual test...)", () => {
		expect.assertions(0);

		type Obj = {
			readonly a?: "aa";
			b: "bb";
		};
		const obj = {} as unknown as PickOptional<Obj>;
		// hit F12 here:
		void obj.a;
	});
});
