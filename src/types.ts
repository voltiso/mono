export interface Callable<Args extends unknown[] = unknown[], R = unknown> {
	(...args: Args): R
}

export interface Newable<Args extends unknown[] = unknown[], R = unknown> {
	new (...args: Args): R
}
