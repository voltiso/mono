import { ISchema } from "../../schema.js";
import { BigintOptions } from "./_/BigintOptions.js";

export const IS_BIGINT = Symbol("IS_BIGINT");
export type IS_BIGINT = typeof IS_BIGINT;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IBigint<O extends BigintOptions = BigintOptions>
	extends ISchema<O> {
	readonly [IS_BIGINT]: true;

	get getMin(): bigint | undefined;
	get getMax(): bigint | undefined;
}

export function isBigint(x: unknown): x is IBigint {
	return !!(x as IBigint | null)?.[IS_BIGINT];
}
