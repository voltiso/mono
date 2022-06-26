/* eslint-disable max-statements */
/* eslint-disable no-magic-numbers */
import { IsIdentical } from "../../../misc/IsEqual.js";
import { Assert } from "../../../bdd.js";
import { PickByValue } from "./PickByValue.js";

describe("PickByValue", () => {
	it("type", () => {
		expect.assertions(0);

		type A = PickByValue<{ readonly a?: "a"; b: "b" }, unknown>;
		Assert<IsIdentical<A, { readonly a?: "a"; b: "b" }>>();

		type B = PickByValue<{ readonly a?: "a"; b: "b" }, "a">;
		Assert<IsIdentical<B, { readonly a?: "a" }>>();
	});

	type ObjA = {
		readonly a?: "aa";
		b: "bb";
	};

	it("generic", <O extends ObjA>() => {
		expect.assertions(0);

		type A = PickByValue<O, "aa">;
		Assert.is<O, A>();
	});

	it("vscode jump to definition (manual test...)", () => {
		expect.assertions(0);

		type Obj = {
			readonly a?: "aa";
			b: "bb";
		};
		const obj = {} as unknown as PickByValue<Obj, "aa">;
		// hit F12 here:
		void obj.a;
	});
});
