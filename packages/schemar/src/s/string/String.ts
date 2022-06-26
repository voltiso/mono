/* eslint-disable @typescript-eslint/ban-types */
import { CustomString } from "./CustomString.js";
import { String_ } from "./String_.js";
import * as s from "..";
import { lazyValue } from "@voltiso/ts-util";
import { DefaultStringOptions } from "./_/StringOptions.js";

export interface String extends CustomString<DefaultStringOptions> {
	<L extends string>(...literals: L[]): s.Literal<L>;
	<L extends string>(literals: Set<L>): s.Literal<L>;
	<L extends string>(...args: L[] | [Set<L>]): s.Literal<L>;
}

type StringConstructor = new () => String;

export const String = String_ as unknown as StringConstructor;
export const string: String = lazyValue(() => new String());
