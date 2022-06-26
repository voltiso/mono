import type { UndefinedFromOptional } from "./UndefinedFromOptional.js";
import { SimpleAssert } from "./SimpleAssert.js";
import type { IsIdentical } from "./compare.js";

describe("UndefinedFromOptional", () => {
	it("works", () => {
		expect.assertions(0);

		SimpleAssert<
			IsIdentical<
				UndefinedFromOptional<{ x?: number }>,
				{ x?: number | undefined }
			>
		>();

		SimpleAssert<
			IsIdentical<UndefinedFromOptional<{ x: number }>, { x: number }>
		>();
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
