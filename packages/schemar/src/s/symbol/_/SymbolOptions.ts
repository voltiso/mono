import { defaultSchemaOptions, SchemaOptions } from "../../../schema.js";

export interface SymbolOptions extends SchemaOptions {
	_out: symbol;
	_in: symbol;
}

export const defaultSymbolOptions = {
	...defaultSchemaOptions,
};

export type DefaultSymbolOptions = typeof defaultSymbolOptions & SymbolOptions;
