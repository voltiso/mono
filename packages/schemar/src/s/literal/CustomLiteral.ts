import { ILiteral } from "..";
import {
	CustomSchema,
	DefaultOptions,
	OptionalOptions,
	ReadonlyOptions,
} from "../../schema";
import { LiteralOptions } from "./_/LiteralOptions.js";

export interface CustomLiteral<O extends LiteralOptions>
	extends ILiteral<O>,
		CustomSchema<O> {
	//

	get optional(): Optional<this>;
	get readonly(): Readonly<this>;
	default<D>(defaultValue: D): Default<this, D>;
}

type Optional<This extends ILiteral> = CustomLiteral<OptionalOptions<This>>;
type Readonly<This extends ILiteral> = CustomLiteral<ReadonlyOptions<This>>;
type Default<This extends ILiteral, D> = CustomLiteral<DefaultOptions<This, D>>;
