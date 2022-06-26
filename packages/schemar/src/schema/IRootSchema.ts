import { ISchema } from "./ISchema.js";
import { SchemaOptions } from "./SchemaOptions.js";

export type IRootSchema = ISchema<
	SchemaOptions & { optional: false; readonly: false; default: undefined }
>;
