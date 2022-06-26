import { ISchema } from "../../schema.js";
import { LiteralOptions } from "./_/LiteralOptions.js";

export const IS_LITERAL = Symbol("IS_LITERAL");
export type IS_LITERAL = typeof IS_LITERAL;

export interface ILiteral<O extends LiteralOptions = LiteralOptions>
	extends ISchema<O> {
	readonly [IS_LITERAL]: true;

	get getValues(): O["values"];
}

export function isLiteral(x: unknown): x is ILiteral {
	return !!(x as ILiteral | null)?.[IS_LITERAL];
}
