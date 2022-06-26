import { Union } from "../s/union.js";
import { IRootSchema } from "./IRootSchema.js";
import { ISchema } from "./ISchema.js";
import { SchemaOptions } from "./SchemaOptions.js";

export interface CustomSchema<O extends SchemaOptions> extends ISchema<O> {
	or<Other extends IRootSchema>(other: Other): Or<this, Other>;
}

type Or<
	This extends ISchema,
	Other extends IRootSchema
> = This extends IRootSchema ? Union<[This, Other]> : never;
