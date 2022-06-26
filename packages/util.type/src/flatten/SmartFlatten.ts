import type { CanBeUndefinedImpl } from "../CanBeUndefined.js";
import type { IsOptional_ } from "../IsOptional.js";

type SmartFlattenValue<T, k extends keyof T, e> = IsOptional_<
	T,
	k,
	CanBeUndefinedImpl<
		T,
		k,
		SmartFlattenImpl<T[k], e>,
		Exclude<SmartFlattenImpl<T[k], e>, undefined>
	>,
	SmartFlattenImpl<T[k], e>
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SmartFlattenImpl<T, e> = T extends (...args: any[]) => any
	? T
	: // eslint-disable-next-line @typescript-eslint/no-explicit-any
	T extends abstract new (...args: any[]) => any
	? T
	: T extends e
	? T
	: [{ [k in keyof T]: SmartFlattenValue<T, k, e | T> }][0];

export type SmartFlatten<T> = SmartFlattenImpl<T, never>;
