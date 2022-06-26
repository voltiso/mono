/* eslint-disable @typescript-eslint/ban-types */
import { lazyValue } from "@voltiso/ts-util";
import {
	InferableReadonlyTuple,
	IRootSchema,
	RootSchemable,
} from "../../schema";
import { CustomFunction } from "./CustomFunction.js";
import { Function_ } from "./Function_.js";
import { Merge2Simple } from "@voltiso/ts-util/object";
import { DefaultFunctionOptions } from "./_/FunctionOptions.js";
import { GetType_ } from "../../GetType.js";
import { GetSchema_ } from "../unknownSchema/_/getSchema.js";
import * as s from "..";

// type GetFunctionType<O extends FunctionOptions, P extends GetTypeOptions> = (
// 	...args: GetType_<O['arguments'], P>
// ) => GetType_<O['result'], P>

export type Function<
	Args extends InferableReadonlyTuple | ((s.ITuple | s.IArray) & IRootSchema),
	R extends RootSchemable
> = CustomFunction<
	Merge2Simple<
		DefaultFunctionOptions,
		{
			arguments: GetSchema_<Args>;
			result: GetSchema_<R>;

			_out: (
				...args: GetType_<Args, { kind: "out" }>
			) => GetType_<R, { kind: "out" }>;

			_in: (
				...args: GetType_<Args, { kind: "in" }>
			) => GetType_<R, { kind: "in" }>;
		}
	>
>;

export const Function = Function_ as unknown as SFunctionConstructor;

type SFunctionConstructor = new <
	Args extends InferableReadonlyTuple | ((s.ITuple | s.IArray) & IRootSchema),
	R extends RootSchemable
>(
	argumentsSchema: Args,
	resultSchema: R
) => Function<Args, R>;

const function_ = lazyValue(() => new Function(s.array(s.never), s.unknown));
export { function_ as function };
