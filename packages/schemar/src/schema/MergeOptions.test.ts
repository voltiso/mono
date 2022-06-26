import { Assert } from "@voltiso/ts-util/bdd";
import { CustomSchema } from "./CustomSchema.js";
import { ISchema } from "./ISchema.js";
import { MergeOptions } from "./MergeOptions.js";
import { OPTIONS, SchemaOptions } from "./SchemaOptions.js";

describe("MergeOptions", () => {
	interface MySchemaOptions extends SchemaOptions {
		_out: number;
		test: 123;
	}

	it("generic", <O extends MySchemaOptions>() => {
		expect.assertions(0);

		type MySchema = CustomSchema<O>;

		Assert.is<MergeOptions<MySchema, { optional: true }>, ISchema[OPTIONS]>();
	});
});
