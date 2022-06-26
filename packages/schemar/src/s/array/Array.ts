import { lazyValue } from "@voltiso/ts-util";
import { RootSchemable } from "../../schema.js";
import { MutableArray_, ReadonlyArray_ } from "./Array_.js";
import * as s from "..";
import { Merge2Simple } from "@voltiso/ts-util/object";
import {
	DefaultMutableArrayOptions,
	DefaultReadonlyArrayOptions,
} from "./_/ArrayOptions";
import { CustomArray } from "./CustomArray.js";
import { GetSchema_ } from "../unknownSchema/_/getSchema.js";
import { GetType_ } from "../../GetType.js";

export interface MutableArray<S extends RootSchemable>
	extends CustomArray<
		Merge2Simple<
			DefaultMutableArrayOptions,
			{
				element: GetSchema_<S>;
				_out: GetType_<S, { kind: "out" }>[];
				_in: GetType_<S, { kind: "in" }>[];
			}
		>
	> {
	<S extends RootSchemable>(elementSchema: S): MutableArray<S>;
}

export interface ReadonlyArray<S extends RootSchemable>
	extends CustomArray<
		Merge2Simple<
			DefaultReadonlyArrayOptions,
			{
				element: GetSchema_<S>;
				_out: readonly GetType_<S, { kind: "out" }>[];
				_in: readonly GetType_<S, { kind: "in" }>[];
			}
		>
	> {
	<S extends RootSchemable>(elementSchema: S): ReadonlyArray<S>;
}

//

export const ReadonlyArray =
	ReadonlyArray_ as unknown as ReadonlyArrayConstructor;

export const MutableArray = MutableArray_ as unknown as MutableArrayConstructor;

//

type ReadonlyArrayConstructor = new <T extends RootSchemable>(
	elementType: T
) => ReadonlyArray<T>;

type MutableArrayConstructor = new <T extends RootSchemable>(
	elementType: T
) => MutableArray<T>;

//

export const readonlyArray: ReadonlyArray<s.Unknown> = lazyValue(
	() => new ReadonlyArray(s.unknown)
);
export const mutableArray: MutableArray<s.Unknown> = lazyValue(
	() => new MutableArray(s.unknown)
);

export const array: MutableArray<s.Unknown> = mutableArray;
