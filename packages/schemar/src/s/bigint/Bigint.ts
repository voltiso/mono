import { lazyValue } from "@voltiso/ts-util";
import { CustomBigint } from "./CustomBigint.js";
import { DefaultBigintOptions } from "./_/BigintOptions.js";
import * as s from "..";
import { Bigint_ } from "./Bigint_.js";

export interface Bigint extends CustomBigint<DefaultBigintOptions> {
	<L extends bigint>(...literals: L[]): s.Literal<L>;
	<L extends bigint>(literals: Set<L>): s.Literal<L>;
	<L extends bigint>(...args: L[] | [Set<L>]): s.Literal<L>;
}

export const Bigint = Bigint_ as unknown as BigintConstructor;

type BigintConstructor = new () => Bigint;

export const bigint = lazyValue(() => new Bigint());
