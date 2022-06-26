import { defaultSchemaOptions, SchemaOptions } from "../../../schema.js";

export interface InstanceOptions extends SchemaOptions {
	constructor: abstract new (...args: never[]) => object;
	_out: object;
	_in: object;
}

export const defaultInstanceOptions = {
	...defaultSchemaOptions,
};

export type DefaultInstanceOptions = typeof defaultInstanceOptions;
