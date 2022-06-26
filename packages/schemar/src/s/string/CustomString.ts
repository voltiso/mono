import { AtLeast1 } from "@voltiso/ts-util/array";
import { Merge2Simple } from "@voltiso/ts-util/object";
import { IString } from "..";
import {
	CustomSchema,
	OPTIONS,
	OptionalOptions,
	ReadonlyOptions,
	DefaultOptions,
} from "../../schema";
import { RegExpEntry } from "./_/RegExpEntry.js";
import { StringOptions } from "./_/StringOptions.js";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CustomString<O extends StringOptions>
	extends IString<O>,
		CustomSchema<O> {
	minLength<Min extends number>(minLength: Min): MinLength<this, Min>;
	maxLength<Max extends number>(maxLength: Max): MaxLength<this, Max>;

	length<ExactLength extends number>(
		exactLength: ExactLength
	): Length<this, ExactLength>;

	length<Min extends number, Max extends number>(
		minLength: Min,
		maxLength: Max
	): LengthRange<this, Min, Max>;

	regex<R extends RegExp>(regExp: R, expectedDescription?: string): Regex<this>;

	get optional(): Optional<this>;
	get readonly(): Readonly<this>;
	default<D>(defaultValue: D): Default<this, D>;
}

type MinLength<S extends IString, MinLength extends number> = CustomString<
	Merge2Simple<S[OPTIONS], { minLength: MinLength }>
>;

type MaxLength<S extends IString, MaxLength extends number> = CustomString<
	Merge2Simple<S[OPTIONS], { maxLength: MaxLength }>
>;

type Length<S extends IString, Length extends number> = CustomString<
	Merge2Simple<S[OPTIONS], { minLength: Length; maxLength: Length }>
>;

type LengthRange<
	S extends IString,
	MinLength extends number,
	MaxLength extends number
> = CustomString<
	Merge2Simple<S[OPTIONS], { minLength: MinLength; maxLength: MaxLength }>
>;

type Regex<S extends IString> = CustomString<
	Merge2Simple<S[OPTIONS], { regExps: AtLeast1<RegExpEntry> }>
>;

type Optional<This extends IString> = CustomString<OptionalOptions<This>>;
type Readonly<This extends IString> = CustomString<ReadonlyOptions<This>>;
type Default<This extends IString, D> = CustomString<DefaultOptions<This, D>>;
