import { AtLeast2 } from "@voltiso/ts-util/array";
import { ISchema, RootSchemable } from "../../schema.js";
import { UnionOptions } from "./_/UnionOptions.js";

export const IS_UNION = Symbol("IS_UNION");
export type IS_UNION = typeof IS_UNION;

export interface IUnion<O extends UnionOptions = UnionOptions>
	extends ISchema<O> {
	readonly [IS_UNION]: true;

	get getSchemas(): [...AtLeast2<RootSchemable>];
}

export function isUnion(x: unknown): x is IUnion {
	return !!(x as IUnion | null)?.[IS_UNION];
}
