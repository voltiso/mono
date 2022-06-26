import type { NoThis } from "./noThis";

export type Callable<
	Args extends unknown[] = never[],
	R = unknown,
	This = NoThis
> = [This] extends [NoThis]
	? (...args: Args) => R
	: (this: This, ...args: Args) => R;

export type CallableWithThis<
	Args extends unknown[] = never[],
	R = unknown,
	This = never
> = (this: This, ...args: Args) => R;
