export interface Callable<Args extends unknown[] = never[], R = unknown> {
	(...args: Args): R
}
