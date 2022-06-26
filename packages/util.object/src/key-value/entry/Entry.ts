/* eslint-disable @typescript-eslint/no-explicit-any */
import { ToStringKey } from "../key.js";
import { Value } from "../value.js";

export type IEntry = [keyof any, unknown];

export type Entry<O extends object> = O extends unknown
	? {
			[k in keyof O]-?: [k, Value<O, k>];
	  }[keyof O]
	: never;

//

export type ICoercedEntry = [ToStringKey<keyof any>, unknown];

export type CoercedEntry<O extends object> = O extends unknown
	? {
			[k in keyof O]-?: [ToStringKey<k>, Value<O, k>];
	  }[keyof O]
	: never;
