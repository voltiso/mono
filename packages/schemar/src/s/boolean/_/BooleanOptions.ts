import { defaultSchemaOptions, SchemaOptions } from "../../../schema.js";

export interface BooleanOptions extends SchemaOptions {
	_out: boolean;
	_in: boolean;
}

export const defaultBooleanOptions = defaultSchemaOptions;

export type DefaultBooleanOptions = typeof defaultBooleanOptions &
	BooleanOptions;
