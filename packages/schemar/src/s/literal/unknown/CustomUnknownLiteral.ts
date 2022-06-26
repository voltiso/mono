import {
	CustomSchema,
	DefaultOptions,
	OptionalOptions,
	ReadonlyOptions,
} from "../../../schema";
import { IUnknownLiteral } from "./IUnknownLiteral.js";
import { UnknownLiteralOptions } from "./_/UnknownLiteralOptions.js";

export interface CustomUnknownLiteral<O extends UnknownLiteralOptions>
	extends IUnknownLiteral<O>,
		CustomSchema<O> {
	//

	get optional(): Optional<this>;
	get readonly(): Readonly<this>;
	default<D>(defaultValue: D): Default<this, D>;
}

type Optional<This extends IUnknownLiteral> = CustomUnknownLiteral<
	OptionalOptions<This>
>;

type Readonly<This extends IUnknownLiteral> = CustomUnknownLiteral<
	ReadonlyOptions<This>
>;

type Default<This extends IUnknownLiteral, D> = CustomUnknownLiteral<
	DefaultOptions<This, D>
>;
