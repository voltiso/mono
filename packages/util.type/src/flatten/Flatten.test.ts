/* eslint-disable max-statements */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-magic-numbers */
/* eslint-disable @typescript-eslint/ban-types */
import type { IsCompatible, IsIdentical } from "../compare.js";
import { SimpleAssert } from "../SimpleAssert.js";
import type { Flatten, Flatten2, _ } from "./Flatten.js";

describe("Flatten", () => {
	it("works", () => {
		expect.assertions(0);

		type A = Flatten<{ a: 1 } & { b?: 2 }>;

		SimpleAssert<A, { a: 1; b?: 2 }>();
		SimpleAssert<IsIdentical<Flatten<{ a?: 1 }>, { a?: 1 }>>();
		SimpleAssert<
			IsIdentical<Flatten<{ a?: 1 | undefined }>, { a: 1 }>,
			false
		>();
		SimpleAssert<
			IsIdentical<Flatten<{ a: 1 | undefined }>, { a?: 1 }>,
			false
		>();

		SimpleAssert<
			IsIdentical<Flatten<{ a: 1 | undefined }>, { a?: 1 | undefined }>,
			false
		>();

		SimpleAssert<
			IsIdentical<Flatten<{ a: 1 | undefined }>, { a: 1 | undefined }>
		>();

		SimpleAssert<Flatten<number>, number>();
		SimpleAssert<Flatten<string>, string>();
		SimpleAssert<Flatten<Date>, Date>();
		SimpleAssert<IsIdentical<Flatten<typeof Date>, typeof Date>>();

		// type B = Flatten<{ a: 1 } | { a: 1; b: 2 }>
		// Assert<IsIdentical<B, { a: 1; b?: 2 }>>()

		type Rec = Rec[] | string;
		SimpleAssert<Flatten<Rec>, Rec>();

		SimpleAssert<
			IsIdentical<
				Flatten<
					{
						a: { a: 1 };
					} & {
						a: { b: 2 };
					}
				>,
				{
					a: {
						a: 1;
					} & {
						b: 2;
					};
				}
			>
		>();

		SimpleAssert<
			IsIdentical<
				Flatten2<
					{
						a: { a?: 1 };
					} & {
						a?: { b: 2 };
					}
				>,
				{
					a: {
						a?: 1;
						b: 2;
					};
				}
			>
		>();

		SimpleAssert<
			IsIdentical<
				Flatten<
					{
						a: { a: 1 };
					} & {
						a: { b: 2 };
					}
				>,
				{
					a: {
						a: 1;
						b: 2;
					};
				}
			>,
			false
		>();
	});

	it("primitives", () => {
		expect.assertions(0);

		type N = Flatten<number>;
		SimpleAssert<IsIdentical<N, number>>();

		type S = Flatten<string>;
		SimpleAssert<IsIdentical<S, string>>();

		type B = Flatten<boolean>;
		SimpleAssert<IsIdentical<B, boolean>>();
	});

	it("nullish", () => {
		expect.assertions(0);

		type Null = Flatten<null>;
		SimpleAssert<IsIdentical<Null, null>>();

		type Undef = Flatten<undefined>;
		SimpleAssert<IsIdentical<Undef, undefined>>();
	});

	it("nullish (generic)", <N extends null>() => {
		expect.assertions(0);

		type A = Flatten<N>;
		SimpleAssert<A, null>();
	});

	it("TS types - unknown, ...", () => {
		expect.assertions(0);

		type U = Flatten<unknown>;
		SimpleAssert<IsIdentical<U, unknown>>();

		type A = Flatten<any>;
		SimpleAssert<IsIdentical<A, any>>();

		type N = Flatten<never>;
		SimpleAssert<IsIdentical<N, never>>();

		type V = Flatten<void>;
		SimpleAssert<IsIdentical<V, void>>();
	});

	it("object", () => {
		expect.assertions(0);

		type O = Flatten<object>;
		SimpleAssert<IsIdentical<O, object>>();

		type OO = Flatten<{}>;
		SimpleAssert<IsIdentical<OO, {}>>();

		type OOO = Flatten<Object>;
		SimpleAssert<IsIdentical<OOO, Object>>();

		type OOOO = Flatten<Record<string, unknown>>;
		SimpleAssert<IsIdentical<OOOO, Record<string, unknown>>>();
	});

	it("works with index signatures", () => {
		expect.assertions(0);

		type X = Flatten<{ b: 2; [k: string]: 1 | 2 } & { a: 1 }>;
		SimpleAssert<IsIdentical<X, { [k: string]: 1 | 2; a: 1; b: 2 }>>();

		type A = Flatten<
			{ [k: string]: number; [k: number]: 2; [k: symbol]: 3 } & { a: 123 }
		>;

		SimpleAssert<
			IsIdentical<
				A,
				{ [k: string]: number; [k: number]: 2; [k: symbol]: 3; a: 123 }
			>
		>();
	});

	it("works with construct signatures", () => {
		expect.assertions(0);

		type X = Flatten<new (n: number) => string>;
		SimpleAssert<IsIdentical<X, new (n: number) => string>>();

		type XX = Flatten<(new (x: 22) => string) & { a?: 1 }>;
		SimpleAssert<IsCompatible<XX, { new (x: 22): string; a?: 1 }>>();
	});

	it("works with generics (unknown)", <X>() => {
		expect.assertions(0);

		SimpleAssert<Flatten<X>, X>();
	});

	it("works with generics (string)", <X extends string>() => {
		expect.assertions(0);

		type Y = Flatten<X>;
		SimpleAssert<Y, X>();
	});

	it("readonly", () => {
		expect.assertions(0);

		type A = Flatten<{ readonly a: 1 }>;
		SimpleAssert<IsIdentical<A, { readonly a: 1 }>>();

		type B = Flatten<{ readonly a: 1 } & { readonly b: 2 }>;
		SimpleAssert<IsIdentical<B, { readonly a: 1; readonly b: 2 }>>();
	});
});
