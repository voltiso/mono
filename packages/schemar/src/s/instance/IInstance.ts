import { ISchema } from "../../schema.js";
import { InstanceOptions } from "./_/InstanceOptions.js";

export const IS_INSTANCE = Symbol("IS_INSTANCE");
export type IS_INSTANCE = typeof IS_INSTANCE;

export interface IInstance<O extends InstanceOptions = InstanceOptions>
	extends ISchema<O> {
	readonly [IS_INSTANCE]: true;

	readonly getConstructor: O["constructor"];
}

export function isInstance(x: unknown): x is IInstance {
	return !!(x as IInstance | null)?.[IS_INSTANCE];
}
