import { ISchema } from "../../../schema.js";
import { UnknownObjectOptions } from "./_/UnknownObjectOptions.js";

export const IS_UNKNOWN_OBJECT = Symbol("IS_UNKNOWN_OBJECT");
export type IS_UNKNOWN_OBJECT = typeof IS_UNKNOWN_OBJECT;

export interface IUnknownObject<
	O extends UnknownObjectOptions = UnknownObjectOptions
> extends ISchema<O> {
	readonly [IS_UNKNOWN_OBJECT]: true;
}

export function isUnknownObject(x: unknown): x is IUnknownObject {
	return !!(x as IUnknownObject | null)?.[IS_UNKNOWN_OBJECT];
}
