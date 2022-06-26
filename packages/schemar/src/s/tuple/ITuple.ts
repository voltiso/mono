import { ISchema } from "../../schema.js";
import { GetTupleLength } from "./_/GetTupleLength.js";
import { TupleOptions } from "./_/TupleOptions.js";

export const IS_TUPLE = Symbol("IS_TUPLE");
export type IS_TUPLE = typeof IS_TUPLE;

export interface ITuple<O extends TupleOptions = TupleOptions>
	extends ISchema<O> {
	readonly [IS_TUPLE]: true;

	readonly isReadonlyTuple: O["readonlyTuple"];
	readonly getElementSchemas: O["elementSchemas"];
	readonly getLength: GetTupleLength<O["elementSchemas"]>;

	readonly readonlyTuple: ITuple;
}

export function isTuple(x: unknown): x is ITuple {
	return !!(x as ITuple | null)?.[IS_TUPLE];
}
