import { IsIdentical } from "@voltiso/ts-util";
import { Assert } from "@voltiso/ts-util/bdd";
import { literal } from "../../../literal.js";
import { RootSchemable } from "../../../../schema/Schemable.js";
import { GetSchema, getSchema } from "./getSchema.js";
import { IRootSchema } from "../../../../schema.js";
import * as s from "../../..";

describe("getSchema", () => {
	it("works - static", () => {
		expect.assertions(0);

		Assert.is<GetSchema<RootSchemable>, IRootSchema>();

		Assert<IsIdentical<GetSchema<true>, s.Literal<true>>>();
		Assert<IsIdentical<GetSchema<false>, s.Literal<false>>>();
		// Assert<IsIdentical<GetSchema<boolean>, never>>()

		Assert<IsIdentical<GetSchema<123>, s.Literal<123>>>();
		// Assert<IsIdentical<GetSchema<number>, never>>()

		Assert<IsIdentical<GetSchema<"abc">, s.Literal<"abc">>>();
		// Assert<IsIdentical<GetSchema<string>, never>>()

		Assert<IsIdentical<GetSchema<12n>, s.Literal<12n>>>();
		// Assert<IsIdentical<GetSchema<bigint>, never>>()

		const sym = Symbol("sym");
		Assert<IsIdentical<GetSchema<typeof sym>, s.Literal<typeof sym>>>();
		// Assert<IsIdentical<GetSchema<symbol>, never>>()
	});

	it("works", () => {
		expect.hasAssertions();

		expect(getSchema(true).extends(true)).toBeTruthy();
		expect(getSchema(true).extends(literal(true))).toBeTruthy();
		expect(literal(true).extends(literal(true))).toBeTruthy();

		expect(getSchema(true).extends(s.boolean)).toBeTruthy();

		expect(getSchema(false).extends(false)).toBeTruthy();
		expect(getSchema(false).extends(literal(false))).toBeTruthy();
		expect(literal(false).extends(literal(false))).toBeTruthy();

		expect(getSchema(123).extends(123)).toBeTruthy();
		expect(getSchema(123).extends(literal(123))).toBeTruthy();
		expect(literal(123).extends(123)).toBeTruthy();

		expect(getSchema(null).extends(null)).toBeTruthy();
		expect(getSchema(null).extends(s.null)).toBeTruthy();
		expect(getSchema(s.null).extends(null)).toBeTruthy();
		expect(getSchema(s.null).extends(s.null)).toBeTruthy();

		expect(getSchema(undefined).extends(undefined)).toBeTruthy();
		expect(getSchema(undefined).extends(s.undefined)).toBeTruthy();
		expect(getSchema(s.undefined).extends(undefined)).toBeTruthy();
		expect(getSchema(s.undefined).extends(s.undefined)).toBeTruthy();

		expect(getSchema(undefined).extends(null)).toBeFalsy();
		expect(getSchema(null).extends(undefined)).toBeFalsy();
	});

	it("no readonly tuples", () => {
		expect.hasAssertions();

		const a = getSchema([1, 2, s.number] as const);
		expect(a.extends(s.readonlyTuple)).toBeTruthy();
		expect(a.extends(s.tuple)).toBeTruthy();
	});
});
