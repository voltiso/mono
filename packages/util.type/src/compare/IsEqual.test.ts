/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-statements */
/* eslint-disable @typescript-eslint/ban-types */
import { SimpleAssert } from "../SimpleAssert.js";
import type {
	IsCompatible,
	IsEqual,
	IsIdentical,
	IsRelated,
} from "./IsEqual.js";

describe("isEqual", () => {
	it("simple", () => {
		expect.assertions(0);
		SimpleAssert<IsIdentical<unknown, unknown>>();
	});

	it("works", () => {
		expect.assertions(0);

		SimpleAssert<IsRelated<123, number>>();
		SimpleAssert<IsRelated<number, 123>>();
		SimpleAssert<IsRelated<number, number>>();
		SimpleAssert<IsRelated<123, 444>, false>();
		SimpleAssert<IsRelated<number, string>, false>();

		//

		SimpleAssert<IsCompatible<{}, Record<string, any>>>(); // hmm...
		SimpleAssert<IsIdentical<{}, Record<string, any>>, false>();
		SimpleAssert<IsEqual<{}, Record<string, any>>, false>();

		//

		SimpleAssert<IsCompatible<{ a: 1; b: 1 }, { a: 1 } & { b: 1 }>>();
		SimpleAssert<IsIdentical<{ a: 1; b: 1 }, { a: 1 } & { b: 1 }>, false>(); // oops...
		SimpleAssert<IsEqual<{ a: 1; b: 1 }, { a: 1 } & { b: 1 }>>();

		//

		SimpleAssert<
			IsCompatible<{ a: { a: 1; b: 1 } }, { a: { a: 1 } & { b: 1 } }>
		>();
		SimpleAssert<
			IsIdentical<{ a: { a: 1; b: 1 } }, { a: { a: 1 } & { b: 1 } }>,
			false
		>(); // oops...
		SimpleAssert<IsEqual<{ a: { a: 1; b: 1 } }, { a: { a: 1 } & { b: 1 } }>>();

		//

		SimpleAssert<IsCompatible<{ a: 1 }, { a: 1 | undefined }>, false>();
		SimpleAssert<IsIdentical<{ a: 1 }, { a: 1 | undefined }>, false>();
		SimpleAssert<IsEqual<{ a: 1 }, { a: 1 | undefined }>, false>();

		//

		SimpleAssert<IsCompatible<{ a?: 1 }, { a: 1 | undefined }>, false>();
		SimpleAssert<IsIdentical<{ a?: 1 }, { a: 1 | undefined }>, false>();
		SimpleAssert<IsEqual<{ a?: 1 }, { a: 1 | undefined }>, false>();

		//

		SimpleAssert<IsCompatible<{ a?: 1 }, { a?: 1 | undefined }>, false>();
		SimpleAssert<IsIdentical<{ a?: 1 }, { a?: 1 | undefined }>, false>();
		SimpleAssert<IsEqual<{ a?: 1 }, { a?: 1 | undefined }>, false>();

		//

		SimpleAssert<IsCompatible<any, unknown>>(); // hmm...
		SimpleAssert<IsIdentical<any, unknown>, false>();
		SimpleAssert<IsEqual<any, unknown>, false>();

		//

		type Rec = Rec[] | string;
		SimpleAssert<IsCompatible<Rec, Rec[] | string>>();
		SimpleAssert<IsIdentical<Rec, Rec[] | string>>();
		SimpleAssert<IsEqual<Rec, Rec[] | string>>();

		//

		SimpleAssert<IsCompatible<{ a: 1 }, { a: 1 | undefined }>, false>();

		//

		type G0 = (a: string) => number;
		type G1 = (this: bigint, a: string) => number;
		SimpleAssert<IsCompatible<G0, G1>>(); // hmm
		SimpleAssert<IsIdentical<G0, G1>, false>();
		SimpleAssert<IsEqual<G0, G1>, false>();

		//

		type C = {
			c: {} & {
				c: C;
			};
		};

		SimpleAssert<IsIdentical<C, { c: { c: C } }>>();
	});
});
