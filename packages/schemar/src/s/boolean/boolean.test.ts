/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Assert } from "@voltiso/ts-util/bdd";
import { IRootSchema } from "../../schema.js";
import { GetOutputType } from "../../GetType.js";
import * as s from "..";
import { BooleanOptions } from "./_/BooleanOptions.js";
import { CustomBoolean } from "./CustomBoolean.js";
import { IsIdentical } from "@voltiso/ts-util";

/* eslint-disable @typescript-eslint/no-unsafe-call */
describe("boolean", () => {
	it("generic", <O extends BooleanOptions>() => {
		expect.assertions(0);

		Assert.is<s.IBoolean<O>, s.IBoolean>();
		Assert.is<CustomBoolean<O>, s.IBoolean<O>>();
		Assert.is<CustomBoolean<O>, s.IBoolean>();
	});

	it("simple", () => {
		expect.hasAssertions();

		Assert.is<s.Boolean, IRootSchema>();

		const aa = s.boolean;
		type Aa = typeof aa.Type;
		Assert<IsIdentical<Aa, boolean>>();

		expect(s.boolean.extends(s.unknown)).toBeTruthy();
		expect(s.boolean.extends(s.boolean)).toBeTruthy();

		expect(s.boolean.extends(s.literal(true))).toBeFalsy();
		expect(s.boolean.extends(s.literal(false))).toBeFalsy();

		expect(s.boolean.extends(s.boolean(true))).toBeFalsy();
		expect(s.boolean.extends(s.boolean(false))).toBeFalsy();

		expect(s.boolean.extends(s.literal(true, false))).toBeTruthy();
		expect(s.boolean.extends(s.union(s.literal(true), false))).toBeTruthy();
		expect(s.boolean.extends(s.union(true, false))).toBeTruthy();
		expect(s.boolean.extends(s.union(true, true))).toBeFalsy();
		expect(s.boolean.extends(s.union(false, false))).toBeFalsy();

		expect(s.boolean(true).extends(s.boolean)).toBeTruthy();
		expect(s.boolean(true).extends(s.boolean(true, false))).toBeTruthy();
		expect(s.boolean(true).extends(s.boolean(true, true))).toBeTruthy();
		expect(s.boolean(true).extends(s.boolean(false))).toBeFalsy();
		expect(s.boolean(true).extends(s.boolean(false, false))).toBeFalsy();
		expect(s.boolean.extends(s.boolean(true, false))).toBeTruthy();
		expect(s.boolean.extends(s.boolean(true))).toBeFalsy();

		const a = s.boolean(false);
		type A = GetOutputType<typeof a>;
		Assert.is<A, false>();
	});
});
