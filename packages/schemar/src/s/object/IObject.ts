import { ISchema } from "../../schema.js";
import { ObjectOptions } from "./_/ObjectOptions.js";

export const IS_OBJECT = Symbol("IS_SHAPE");
export type IS_OBJECT = typeof IS_OBJECT;

export interface IObject<O extends ObjectOptions = ObjectOptions>
	extends ISchema<O> {
	readonly [IS_OBJECT]: true;

	readonly getShape: O["shape"];

	readonly partial: IObject;
	readonly deepPartial: IObject;
}

export function isObject(x: unknown): x is IObject {
	return !!(x as IObject | null)?.[IS_OBJECT];
}
