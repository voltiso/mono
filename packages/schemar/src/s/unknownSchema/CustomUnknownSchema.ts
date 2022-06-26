import {
	CustomSchema,
	DefaultOptions,
	OptionalOptions,
	ReadonlyOptions,
} from "../../schema";
import { IUnknownSchema } from "./IUnknownSchema.js";
import { UnknownSchemaOptions } from "./_/UnknownSchemaOptions.js";

export interface CustomUnknownSchema<O extends UnknownSchemaOptions>
	extends IUnknownSchema<O>,
		CustomSchema<O> {
	get optional(): Optional<this>;
	get readonly(): Readonly<this>;
	default<D>(defaultValue: D): Default<this, D>;
}

type Optional<This extends IUnknownSchema> = CustomUnknownSchema<
	OptionalOptions<This>
>;

type Readonly<This extends IUnknownSchema> = CustomUnknownSchema<
	ReadonlyOptions<This>
>;

type Default<This extends IUnknownSchema, D> = CustomUnknownSchema<
	DefaultOptions<This, D>
>;
