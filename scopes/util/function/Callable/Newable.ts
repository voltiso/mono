export type Newable<
	Args extends unknown[] = never[],
	R = unknown
> = abstract new (...args: Args) => R
