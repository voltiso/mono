import { IsIdentical } from "@voltiso/ts-util";
import { Assert } from "@voltiso/ts-util/bdd";
import { number } from "../number.js";
import { unknown } from "../unknown.js";
import { IRootSchema } from "../../schema.js";
import { GetOutputType } from "../../GetType.js";
import { ISymbol } from "./ISymbol.js";
import { SymbolOptions } from "./_/SymbolOptions.js";
import { CustomSymbol } from "./CustomSymbol.js";
import * as s from "..";

describe("symbol", () => {
	it("generic", <O extends SymbolOptions>() => {
		expect.assertions(0);

		Assert.is<ISymbol<O>, ISymbol>();
		Assert.is<CustomSymbol<O>, ISymbol<O>>();
		Assert.is<CustomSymbol<O>, ISymbol>();
	});

	it("simple", () => {
		expect.hasAssertions();

		Assert.is<typeof s.symbol, IRootSchema>();

		type A = GetOutputType<typeof s.symbol>;
		Assert<IsIdentical<A, symbol>>();

		expect(s.symbol.extends(s.symbol)).toBeTruthy();
		expect(s.symbol.extends(null)).toBeFalsy();
		expect(s.symbol.extends(unknown)).toBeTruthy();
		expect(s.symbol.extends(number)).toBeFalsy();

		const sym = Symbol("sym");
		expect(s.symbol(sym).extends(s.symbol)).toBeTruthy();
		expect(s.symbol(sym).extends(s.symbol(sym))).toBeTruthy();
		expect(s.symbol.extends(s.symbol(sym))).toBeFalsy();
	});
});
