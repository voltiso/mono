import { HasIndex, _ } from "@voltiso/ts-util/object";
import { GetType_ } from "./GetType.js";
import { GetOptions } from "./GetOptions.js";
import { GetTypeOptions } from "./GetTypeOptions.js";
import { SchemaOptions } from "../schema.js";

type GetObjectTypeNoSignature<
	T,
	O extends Record<keyof T, SchemaOptions>,
	IO extends GetTypeOptions
> = Finalize<
	{
		[k in keyof T as O[k]["readonly"] extends false
			? IsOptional<O[k], IO, never, k>
			: never]: T[k];
	} & {
		[k in keyof T as O[k]["readonly"] extends false ? k : never]?: T[k];
	} & {
		readonly [k in keyof T as IsOptional<O[k], IO> extends false
			? k
			: never]: T[k];
	} & {
		readonly [k in keyof T]?: T[k];
	},
	IO
>;

export type GetObjectType_<
	T extends object,
	IO extends GetTypeOptions
> = HasIndex<T> extends true
	? {
			[k in keyof T]: GetType_<T[k], IO>;
	  }
	: HasIndex<T> extends false
	? GetObjectTypeNoSignature<
			{
				[k in keyof T]: GetType_<T[k], IO>;
			},
			{
				[k in keyof T]: GetOptions<T[k]>;
			},
			IO
	  >
	: never;

type IsOptional<
	O extends SchemaOptions,
	IO extends GetTypeOptions,
	T = true,
	F = false
> = O["optional"] extends true
	? T
	: [O["default"]] extends [undefined]
	? F
	: IO["kind"] extends "in"
	? T
	: IO["kind"] extends "out"
	? F
	: never;

type Finalize<T, IO extends GetTypeOptions> = IO["kind"] extends "in"
	? _<
			{
				[k in keyof T as object extends T[k] ? never : k]: T[k];
			} & {
				[k in keyof T as object extends T[k] ? k : never]?: T[k];
			}
	  >
	: IO["kind"] extends "out"
	? _<T>
	: never;
