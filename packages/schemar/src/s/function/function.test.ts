import { IsIdentical } from "@voltiso/ts-util";
import { Assert } from "@voltiso/ts-util/bdd";
import { IRootSchema, RootSchemable } from "../../schema.js";
import { GetInputType, GetOutputType, GetType_ } from "../../GetType.js";
import { FunctionOptions } from "./_/FunctionOptions.js";
import { CustomFunction } from "./CustomFunction.js";
import * as s from "..";

describe("function", () => {
	it("generic", <O extends FunctionOptions>() => {
		expect.assertions(0);

		Assert.is<
			GetType_<(s.ITuple | s.IArray) & IRootSchema, { kind: "out" }>,
			readonly unknown[]
		>();

		Assert.is<GetType_<O["arguments"], { kind: "out" }>, readonly unknown[]>();

		Assert.is<
			never[],
			GetType_<(s.ITuple | s.IArray) & IRootSchema, { kind: "out" }>
		>();

		// Assert.is<never[], []>()
		// Assert.is<never[], GetType_<O['arguments'], { kind: 'out' }>>()

		Assert.is<s.IFunction<O>, s.IFunction>();
		Assert.is<CustomFunction<O>, s.IFunction<O>>();
		Assert.is<CustomFunction<O>, s.IFunction>();

		const a = s.function(s.readonlyArray(s.number(123)), s.string);
		Assert.is<typeof a, RootSchemable>();
	});

	it("simple", () => {
		expect.hasAssertions();
		() => s.function(s.tuple(s.number), s.number);

		type T = GetOutputType<typeof s.function>;
		Assert<IsIdentical<T, (...args: never[]) => unknown>>();

		type IT = GetInputType<typeof s.function>;
		Assert<IsIdentical<IT, (...args: never[]) => unknown>>();

		expect(s.function.extends(s.unknown)).toBeTruthy();

		expect(
			s.function(s.array(s.never), s.unknown).extends(s.function)
		).toBeTruthy();

		expect(
			s.function.extends(s.function(s.array(s.never), s.unknown))
		).toBeTruthy();

		expect(
			s.function.extends(s.function(s.array(s.never), s.string))
		).toBeFalsy();

		expect(
			s.function.extends(s.function(s.array(s.string), s.unknown))
		).toBeFalsy();

		expect(
			s.function(s.array(s.number), s.string).extends(s.unknown)
		).toBeTruthy();

		expect(
			s.function(s.array(s.number), s.string).extends(s.function)
		).toBeTruthy();

		const a = s.function(s.array(s.number), s.string("asd"));
		type A = GetOutputType<typeof a>;
		Assert<IsIdentical<A, (...args: number[]) => "asd">>();
		Assert<IsIdentical<GetInputType<typeof a>, (...args: number[]) => "asd">>();

		expect(() => s.function.validate(123)).toThrow("function");
		expect(() => s.function.validate(null)).toThrow("function");
		expect(s.function.isValid(() => 0)).toBeTruthy();
	});

	it("complex 1", () => {
		expect.hasAssertions();

		const a = s.function(s.readonlyArray(s.number), s.string("asd"));
		const b = s.function(s.readonlyArray(s.number(123)), s.string);
		expect(a.extends(b)).toBeTruthy();
	});

	it("complex 2", () => {
		expect.hasAssertions();

		const a = s.function(s.array(s.number), s.string("asd"));
		const b = s.function(s.array(s.number(123)), s.string);
		expect(a.extends(b)).toBeTruthy();
	});

	it("complex 3", () => {
		expect.hasAssertions();

		const a = s.function(s.readonlyArray(s.number), "asd");
		const b = s.function(s.array(s.number(123)), s.string);
		expect(a.extends(b)).toBeTruthy();
	});

	it("complex 4", () => {
		expect.hasAssertions();

		// readonly for args should be discarded

		const a = s.function(s.array(s.number), s.string("asd"));
		const b = s.function(s.readonlyArray(123), s.string);
		expect(a.extends(b)).toBeTruthy();
	});

	it("extends - arguments can be longer", () => {
		expect.hasAssertions();

		const tupleA = s.tuple(1, 2, 3);
		const tupleB = s.tuple(1, 2, 3, 4);

		expect(tupleA.extends(tupleB)).toBeFalsy();
		expect(tupleB.extends(tupleA)).toBeFalsy();

		const funA = s.function(tupleA, 0);
		const funB = s.function(tupleB, 0);

		type FunA = typeof funA.OutputType;
		type FunB = typeof funB.OutputType;

		Assert.is<FunA, FunB>();
		expect(funA.extends(funB)).toBeTruthy();

		// Assert.is<FunB, FunA>()
		expect(funB.extends(funA)).toBeFalsy();
	});
});
