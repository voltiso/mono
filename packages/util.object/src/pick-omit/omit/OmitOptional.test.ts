/* eslint-disable max-statements */
/* eslint-disable no-magic-numbers */
import { IsIdentical } from "../../../misc/IsEqual.js";
import { Assert } from "../../../bdd.js";
import { OmitOptional } from "./OmitOptional.js";

describe("OmitOptional", () => {
	it("type", () => {
		expect.assertions(0);

		type A = OmitOptional<{ readonly a: "a"; b?: "b" }>;
		Assert<IsIdentical<A, { readonly a: "a" }>>();
	});

	type ObjA = {
		readonly a?: "aa";
		b: "bb";
	};

	it("generic", <O extends ObjA>() => {
		expect.assertions(0);

		type A = OmitOptional<O>;
		Assert.is<O, A>();
	});

	it("vscode jump to definition (manual test...)", () => {
		expect.assertions(0);

		type Obj = {
			readonly a: "aa";
			b?: "bb";
		};
		const obj = {} as unknown as OmitOptional<Obj>;
		// hit F12 here:
		void obj.a;
	});
});
