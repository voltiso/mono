import {
	CustomSchema,
	DefaultOptions,
	OptionalOptions,
	ReadonlyOptions,
} from "../../schema";
import { IBoolean } from "./IBoolean.js";
import { BooleanOptions } from "./_/BooleanOptions.js";

export interface CustomBoolean<O extends BooleanOptions>
	extends IBoolean<O>,
		CustomSchema<O> {
	//

	get optional(): Optional<this>;
	get readonly(): Readonly<this>;
	default<D>(defaultValue: D): Default<this, D>;
}

//

type Optional<This extends IBoolean> = CustomBoolean<OptionalOptions<This>>;
type Readonly<This extends IBoolean> = CustomBoolean<ReadonlyOptions<This>>;
type Default<This extends IBoolean, D> = CustomBoolean<DefaultOptions<This, D>>;
