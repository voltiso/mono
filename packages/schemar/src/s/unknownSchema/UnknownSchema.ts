import { lazyValue } from "@voltiso/ts-util";
import { CustomUnknownSchema } from "./CustomUnknownSchema.js";
import { DefaultUnknownSchemaOptions } from "./_/UnknownSchemaOptions.js";
import { UnknownSchema_ } from "./UnknownSchema_.js";
import { GetSchemaFunction } from "./_/getSchema.js";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UnknownSchema
	extends CustomUnknownSchema<DefaultUnknownSchemaOptions>,
		GetSchemaFunction {}

export const UnknownSchema = UnknownSchema_ as unknown as UnknownConstructor;

type UnknownConstructor = new () => UnknownSchema;

export const schema = lazyValue(() => new UnknownSchema());
