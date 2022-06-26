import { ISchema } from "../../schema.js";
import { UnknownSchemaOptions } from "./_/UnknownSchemaOptions.js";

export const IS_UNKNOWN_SCHEMA = Symbol("IS_UNKNOWN");
export type IS_UNKNOWN_SCHEMA = typeof IS_UNKNOWN_SCHEMA;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUnknownSchema<
	O extends UnknownSchemaOptions = UnknownSchemaOptions
> extends ISchema<O> {
	readonly [IS_UNKNOWN_SCHEMA]: true;
}

export function isUnknownSchema(x: unknown): x is IUnknownSchema {
	return !!(x as IUnknownSchema | null)?.[IS_UNKNOWN_SCHEMA];
}
