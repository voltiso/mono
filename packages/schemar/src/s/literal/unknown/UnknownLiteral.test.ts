import { Assert } from "@voltiso/ts-util/bdd";
import { CustomUnknownLiteral } from "./CustomUnknownLiteral.js";
import { IUnknownLiteral } from "./IUnknownLiteral.js";
import { UnknownLiteralOptions } from "./_/UnknownLiteralOptions.js";

describe("UnknownLiteral", () => {
	it("generic", <O extends UnknownLiteralOptions>() => {
		expect.assertions(0);

		Assert.is<IUnknownLiteral<O>, IUnknownLiteral>();
		Assert.is<CustomUnknownLiteral<O>, IUnknownLiteral<O>>();
		Assert.is<CustomUnknownLiteral<O>, IUnknownLiteral>();
	});
});
