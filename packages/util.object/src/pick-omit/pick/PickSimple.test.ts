/* eslint-disable max-statements */
/* eslint-disable no-magic-numbers */
import { IsIdentical } from "../../../misc/IsEqual.js";
import { Assert } from "../../../bdd.js";
import { PickSimple } from "./PickSimple.js";

describe("PickSimple", () => {
	it("type", () => {
		expect.assertions(0);

		type A = PickSimple<{ readonly a?: 1; b: 2 }, "a">;
		Assert<IsIdentical<A, { readonly a?: 1 }>>();
	});

	type ObjA = {
		readonly a?: 1;
		b: 2;
	};

	it("generic", <O extends ObjA>() => {
		expect.assertions(0);

		type A0 = Pick<O, "a">;
		Assert.is<O, A0>();

		// type A1 = PickSimple<O, 'a'>
		// Assert.is<O, A1>()

		// type A2 = PickSimple_<O, 'a'>
		// Assert.is<O, A2>()
	});

	it("discards index signatures", () => {
		expect.assertions(0);

		const sym = Symbol("sym");

		type A = PickSimple<
			{
				[k: string]: number;
				[k: number]: 1;
				[k: symbol]: "a";
				readonly a?: 33;
				b: 44;
				3: 1;
				[sym]: "a";
			},
			string
		>;
		Assert<IsIdentical<A, { readonly a?: 33; b: 44 }>>();
	});

	it("vscode jump to definition (manual test...)", () => {
		expect.assertions(0);

		type Obj = {
			a: 1;
			b: 2;
		};
		const obj = {} as unknown as PickSimple<Obj, "a">;
		// hit F12 here:
		void obj.a;
	});
});
