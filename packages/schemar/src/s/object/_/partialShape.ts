import { getEntries } from "@voltiso/ts-util/object";
import { InferableObject, isSchema } from "../../../schema.js";
import { GetSchema_NoReadonlyTuples_ } from "../../unknownSchema/_/getSchema.js";
import * as s from "../..";

export type PartialShape<O extends InferableObject> = {
	[k in keyof O]: GetSchema_NoReadonlyTuples_<O[k]>["optional"];
};

export function partialShape<O extends InferableObject>(o: O): PartialShape<O> {
	const shape = { ...o } as InferableObject;
	for (const [k, v] of getEntries(shape)) {
		shape[k] = (isSchema(v) ? v : s.schema(v)).optional;
	}
	return shape as never;
}
