import { If } from "@voltiso/ts-util";
import { InferableMutableTuple, InferableReadonlyTuple } from "../schema.js";
import { GetType_ } from "./GetType.js";
import { GetTypeOptions } from "./GetTypeOptions.js";

interface GetTupleTypeOptions extends GetTypeOptions {
	readonlyTuple: boolean;
}

type Rec<
	T,
	acc extends unknown[],
	O extends GetTupleTypeOptions
> = T extends readonly []
	? If<O["readonlyTuple"], readonly [...acc], acc>
	: T extends readonly [infer h, ...infer t]
	? Rec<t, [...acc, GetType_<h, O>], O>
	: T extends readonly (infer E)[]
	? Rec<[], [...acc, ...GetType_<E, O>[]], O>
	: never;

export type GetTupleType_<T, O extends GetTupleTypeOptions> = Rec<T, [], O>;

export type GetTupleType<
	T,
	O extends GetTypeOptions & { readonlyTuple?: never }
> = InferableReadonlyTuple extends T
	? readonly unknown[]
	: InferableMutableTuple extends T
	? unknown[]
	: T extends unknown[]
	? GetTupleType_<T, O & { readonlyTuple: false }>
	: T extends readonly unknown[]
	? GetTupleType_<T, O & { readonlyTuple: true }>
	: never;
