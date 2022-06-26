import {
	CustomSchema,
	DefaultOptions,
	MergeOptions,
	OptionalOptions,
	ReadonlyOptions,
} from "../../schema";
import { ITuple } from "./ITuple.js";
import { TupleOptions } from "./_/TupleOptions.js";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore error TS2589: Type instantiation is excessively deep and possibly infinite.
export interface CustomTuple<O extends TupleOptions>
	extends ITuple<O>,
		CustomSchema<O> {
	get readonlyTuple(): MakeReadonlyTuple<this>;

	get optional(): Optional<this>;
	get readonly(): Readonly<this>;
	default<D>(defaultValue: D): Default<this, D>;
}

type MakeReadonlyTuple<S extends ITuple> = CustomTuple<
	MergeOptions<
		S,
		{
			readonlyTuple: true;
			_out: readonly [...S["OutputType"]];
			_in: readonly [...S["InputType"]];
		}
	>
>;

type Optional<This extends ITuple> = CustomTuple<OptionalOptions<This>>;
type Readonly<This extends ITuple> = CustomTuple<ReadonlyOptions<This>>;
type Default<This extends ITuple, D> = CustomTuple<DefaultOptions<This, D>>;
