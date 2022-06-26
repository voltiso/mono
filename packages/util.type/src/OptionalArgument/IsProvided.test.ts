/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-statements */
import type { IsIdentical } from "../compare.js";
import { SimpleAssert } from "../SimpleAssert.js";
import type { IsProvided } from "./IsProvided.js";
import type { NotProvided } from "./OptionalArgument.js";

describe("OptionalArgument", () => {
	it("type", () => {
		expect.assertions(0);

		type A = IsProvided<never>;
		SimpleAssert<IsIdentical<A, true>>();

		type B = IsProvided<null>;
		SimpleAssert<IsIdentical<B, true>>();

		type C = IsProvided<unknown>;
		SimpleAssert<IsIdentical<C, true>>();

		type D = IsProvided<any>;
		SimpleAssert<IsIdentical<D, true>>();

		type E = IsProvided<void>;
		SimpleAssert<IsIdentical<E, true>>();

		type F = IsProvided<symbol>;
		SimpleAssert<IsIdentical<F, true>>();

		const sym = Symbol("sym");

		type G = IsProvided<typeof sym>;
		SimpleAssert<IsIdentical<G, true>>();

		type H = IsProvided<NotProvided>;
		SimpleAssert<IsIdentical<H, false>>();

		type I = IsProvided<null | NotProvided>;
		SimpleAssert<IsIdentical<I, boolean>>();

		type J = IsProvided<never | NotProvided>;
		SimpleAssert<IsIdentical<J, false>>();

		type K = IsProvided<void | NotProvided>;
		SimpleAssert<IsIdentical<K, boolean>>();
	});

	it("generic - true", <X extends null>() => {
		expect.assertions(0);

		type A = IsProvided<X>;
		SimpleAssert<A, true>();
		// Assert.is<true, A>()
		// Assert.is<A, false>()
		// SimpleAssert<IsIdentical<A, true>>()
	});

	it("generic - not provided (or never)", <X extends NotProvided>() => {
		expect.assertions(0);

		type A = IsProvided<X>;
		SimpleAssert<A, boolean>();
		// Assert.is<A, false>() // IsProvided<never> === true

		// Assert.is<false, A>()
		// Assert.is<A, false>()
		// SimpleAssert<IsIdentical<A, boolean>>()
	});

	it("generic - provided or not (null)", <X extends null | NotProvided>() => {
		expect.assertions(0);

		type A = IsProvided<X>;
		SimpleAssert<A, boolean>();
		// Assert.is<A, true>()
		// Assert.is<A, false>()
	});
});
