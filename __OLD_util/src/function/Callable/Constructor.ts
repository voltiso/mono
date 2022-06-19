export interface Constructor<
	Args extends unknown[] = never[],
	R extends object = object
> {
	new (...args: Args): R
	prototype: R
}
