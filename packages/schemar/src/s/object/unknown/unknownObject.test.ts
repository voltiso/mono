import { Assert } from "@voltiso/ts-util/bdd";
import * as s from "../..";
import { RootSchemable } from "../../../schema.js";
import { CustomUnknownObject } from "./CustomUnknownObject.js";
import { UnknownObjectOptions } from "./_/UnknownObjectOptions.js";

describe("object", () => {
	it("generic", <O extends UnknownObjectOptions>() => {
		expect.assertions(0);

		Assert.is<s.IUnknownObject<O>, s.IUnknownObject>();
		Assert.is<CustomUnknownObject<O>, s.IUnknownObject<O>>();
		Assert.is<CustomUnknownObject<O>, s.IUnknownObject>();

		Assert.is<typeof s.object, s.IUnknownObject>();
		Assert.is<typeof s.object, RootSchemable>();
	});
});
