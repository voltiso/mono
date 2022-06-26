/* eslint-disable no-magic-numbers */
import { IsIdentical } from "../misc/IsEqual.js";
import { Assert } from "../bdd.js";
import { OmitPrivate } from "./OmitPrivate.js";

describe("OmitPrivate", () => {
	it("simple", () => {
		expect.assertions(0);

		type Obj = {
			a: 1;
			_a: 2;
		};

		type A = OmitPrivate<Obj>;

		Assert<IsIdentical<A, { a: 1 }>>();
	});

	it("works", () => {
		expect.assertions(0);

		type Obj = {
			new (arg: { b: 2 }): number;
			(props: { a: 1 }): string;

			a: 1;
			b?: 2;
			c?: 3 | undefined;
			readonly d: 4 | undefined;

			_a: 1;
			_b?: 2;
			_c?: 3 | undefined;
			_d: 4 | undefined;

			get e(): 5;
			get _e(): 5;
		};

		type A = OmitPrivate<Obj>;

		Assert<
			IsIdentical<
				A,
				{
					a: 1;
					b?: 2;
					c?: 3 | undefined;
					readonly d: 4 | undefined;
					get e(): 5;
				} & ((props: { a: 1 }) => string) &
					(new (arg: { b: 2 }) => number)
			>
		>();
	});
});
