import { ISchema } from "../../schema.js";
import { NumberOptions } from "./_/NumberOptions.js";

export const IS_NUMBER = Symbol("IS_NUMBER");
export type IS_NUMBER = typeof IS_NUMBER;

export interface INumber<O extends NumberOptions = NumberOptions>
	extends ISchema<O> {
	readonly [IS_NUMBER]: true;

	get isInteger(): O["integer"];
	get getMin(): O["min"];
	get getMax(): O["max"];

	get integer(): INumber;
	min(minValue: number): INumber;
	max(maxValue: number): INumber;
	range(minValue: number, maxValue: number): INumber;
}

export function isNumber(x: unknown): x is INumber {
	return !!(x as INumber | null)?.[IS_NUMBER];
}
