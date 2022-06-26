/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable max-statements */
/* eslint-disable no-magic-numbers */
import { IsIdentical } from "../../../misc/IsEqual.js";
import { Assert } from "../../../bdd.js";
import { OmitByValue } from "./OmitByValue.js";

describe("OmitByValue", () => {
	it("type", () => {
		expect.assertions(0);

		type A = OmitByValue<{ readonly a?: "a"; b: "b" }, unknown>;
		Assert<IsIdentical<A, {}>>();

		type B = OmitByValue<{ readonly a?: "a"; b: "b" }, "b">;
		Assert<IsIdentical<B, { readonly a?: "a" }>>();
	});

	type ObjA = {
		readonly a?: "aa";
		b: "bb";
	};

	it("generic", <O extends ObjA>() => {
		expect.assertions(0);

		type A = OmitByValue<O, "bb">;
		Assert.is<O, A>();
	});

	it("vscode jump to definition (manual test...)", () => {
		expect.assertions(0);

		type Obj = {
			readonly a?: "aa";
			b: "bb";
		};
		const obj = {} as unknown as OmitByValue<Obj, "bb">;
		// hit F12 here:
		void obj.a;
	});
});
