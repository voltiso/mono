import { defaultSchemaOptions, SchemaOptions } from "../../../schema.js";

export interface NeverOptions extends SchemaOptions {
	_out: never;
	_in: never;
}

export const defaultNeverOptions = {
	...defaultSchemaOptions,
};

export type DefaultNeverOptions = typeof defaultNeverOptions & NeverOptions;
