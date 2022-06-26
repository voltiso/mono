/* eslint-disable jest/require-hook */
import { ISchema } from "../../schema.js";
import { FunctionOptions } from "./_/FunctionOptions.js";

export const IS_FUNCTION = Symbol("IS_FUNCTION");
export type IS_FUNCTION = typeof IS_FUNCTION;

export interface IFunction<O extends FunctionOptions = FunctionOptions>
	extends ISchema<O> {
	readonly [IS_FUNCTION]: true;

	get getArgumentsSchema(): FunctionOptions["arguments"]; // O['arguments']
	get getResultSchema(): O["result"];
}

export function isFunction(x: unknown): x is IFunction {
	return !!(x as IFunction | null)?.[IS_FUNCTION];
}
