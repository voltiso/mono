import { ISchema } from "../../schema.js";
import { BooleanOptions } from "./_/BooleanOptions.js";

export const IS_BOOLEAN = Symbol("IS_BOOLEAN");
export type IS_BOOLEAN = typeof IS_BOOLEAN;

export interface IBoolean<O extends BooleanOptions = BooleanOptions>
	extends ISchema<O> {
	readonly [IS_BOOLEAN]: true;
}

export function isBoolean(x: unknown): x is IBoolean {
	return !!(x as IBoolean | null)?.[IS_BOOLEAN];
}
