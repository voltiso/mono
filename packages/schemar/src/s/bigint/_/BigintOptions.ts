import { defaultSchemaOptions, SchemaOptions } from "../../../schema.js";

export interface BigintOptions extends SchemaOptions {
	_out: bigint;
	_in: bigint;

	min: bigint | undefined;
	max: bigint | undefined;
}

export const defaultBigintOptions = {
	...defaultSchemaOptions,
	min: undefined,
	max: undefined,
};

export type DefaultBigintOptions = typeof defaultBigintOptions & BigintOptions;
