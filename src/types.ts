import { Assert } from './assert'

export interface Callable<Args extends unknown[] = unknown[], R = unknown> {
	(...args: Args): R
}

export interface Newable<Args extends unknown[] = unknown[], R = unknown> {
	new (...args: Args): R
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
Assert<(x: number) => number, Callable<any[]>>()
