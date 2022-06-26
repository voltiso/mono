import { assert, lazyValue } from "@voltiso/ts-util";
import { AtLeast2 } from "@voltiso/ts-util/array";
import { Merge2Simple } from "@voltiso/ts-util/object";
import { GetType_ } from "../../GetType.js";
import { RootSchemable } from "../../schema.js";
import { CustomUnion } from "./CustomUnion.js";
import { isUnion } from "./IUnion.js";
import { Union_ } from "./Union_.js";
import { DefaultUnionOptions } from "./_/UnionOptions.js";

export type Union<Ts extends AtLeast2<RootSchemable>> = CustomUnion<
	Merge2Simple<
		DefaultUnionOptions,
		{
			schemas: Ts;
			_out: GetType_<Ts[number], { kind: "out" }>;
			_in: GetType_<Ts[number], { kind: "in" }>;
		}
	>
>;

export const Union = Union_ as unknown as UnionConstructor;

type UnionConstructor = new <Ts extends AtLeast2<RootSchemable>>(
	schemas: Ts
) => Union<Ts>;

//

function _union<Ts extends AtLeast2<RootSchemable>>(...types: Ts): Union<Ts> {
	let ts = [] as RootSchemable[];

	for (const t of types) {
		if (isUnion(t)) ts = [...ts, ...t.getSchemas];
		else ts.push(t);
	}

	assert(ts.length >= 2);
	return new Union(ts as never) as never;
}

export const union = lazyValue(() => _union);
