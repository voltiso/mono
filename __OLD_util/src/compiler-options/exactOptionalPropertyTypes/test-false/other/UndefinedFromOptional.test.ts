import { IsIdentical } from "../../../../misc/IsEqual.js";
import { Assert } from "../../../../bdd.js";
import { UndefinedFromOptional } from "../../../../object.js";

describe("UndefinedFromOptional", () => {
	it("works", () => {
		expect.assertions(0);

		type A = UndefinedFromOptional<{ x?: number }>;
		Assert<IsIdentical<A, { x?: number | undefined }>>();

		type B = UndefinedFromOptional<{ x: number }>;
		Assert<IsIdentical<B, { x: number }>>();
	});

	it("vscode jump to definition (manual test...)", () => {
		expect.assertions(0);

		type Obj = {
			readonly a?: 0;
			b: 0;
		};

		const obj = {} as unknown as UndefinedFromOptional<Obj>;
		void obj.a;
	});
});
