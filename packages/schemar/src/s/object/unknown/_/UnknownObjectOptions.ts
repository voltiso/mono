import { defaultSchemaOptions, SchemaOptions } from "../../../../schema.js";

export interface UnknownObjectOptions extends SchemaOptions {
	_out: object;
	_in: object;
}

export const defaultUnknownObjectOptions = {
	...defaultSchemaOptions,
};

export type DefaultUnknownObjectOptions = typeof defaultUnknownObjectOptions &
	UnknownObjectOptions;
