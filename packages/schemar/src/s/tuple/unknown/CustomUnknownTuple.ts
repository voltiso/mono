import {
	CustomSchema,
	DefaultOptions,
	MergeOptions,
	OptionalOptions,
	OPTIONS,
	ReadonlyOptions,
	RootSchemable,
} from "../../../schema";
import { IUnknownTuple } from "./IUnknownTuple.js";
import { UnknownTupleOptions } from "./_/UnknownTupleOptions.js";
import * as s from "../..";

type GetTuple<
	This extends IUnknownTuple,
	T extends RootSchemable[]
> = This[OPTIONS]["readonlyTuple"] extends true
	? s.ReadonlyTuple<T>
	: This[OPTIONS]["readonlyTuple"] extends false
	? s.MutableTuple<T>
	: never;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CustomUnknownTuple<O extends UnknownTupleOptions>
	extends IUnknownTuple<O>,
		CustomSchema<O> {
	<T extends RootSchemable[]>(...elementTypes: T): GetTuple<this, T>;

	get readonlyTuple(): MakeReadonlyTuple<this>;

	minLength<Min extends number>(minLength: Min): MinLength<this, Min>;
	maxLength<Max extends number>(maxLength: Max): MaxLength<this, Max>;

	lengthRange<Min extends number, Max extends number>(
		minLength: Min,
		maxLength: Max
	): LengthRange<this, Min, Max>;

	length<ExactLength extends number>(
		exactLength: ExactLength
	): Length<this, ExactLength>;

	get optional(): Optional<this>;
	get readonly(): Readonly<this>;
	default<D>(defaultValue: D): Default<this, D>;
}

type MakeReadonlyTuple<S extends IUnknownTuple> = CustomUnknownTuple<
	MergeOptions<S, { readonlyTuple: true }>
>;

type MinLength<
	S extends IUnknownTuple,
	Min extends number
> = CustomUnknownTuple<MergeOptions<S, { minLength: Min }>>;

type MaxLength<
	S extends IUnknownTuple,
	Max extends number
> = CustomUnknownTuple<MergeOptions<S, { maxLength: Max }>>;

type LengthRange<
	S extends IUnknownTuple,
	Min extends number,
	Max extends number
> = CustomUnknownTuple<MergeOptions<S, { minLength: Min; maxLength: Max }>>;

type Length<
	S extends IUnknownTuple,
	Length extends number
> = CustomUnknownTuple<
	MergeOptions<S, { minLength: Length; maxLength: Length }>
>;

type Optional<This extends IUnknownTuple> = CustomUnknownTuple<
	OptionalOptions<This>
>;

type Readonly<This extends IUnknownTuple> = CustomUnknownTuple<
	ReadonlyOptions<This>
>;

type Default<This extends IUnknownTuple, D> = CustomUnknownTuple<
	DefaultOptions<This, D>
>;
