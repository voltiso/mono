import { noThis } from './noThis'

export type Callable<Args extends unknown[] = never[], R = unknown, This = noThis> = [This] extends [noThis]
	? (...args: Args) => R
	: (this: This, ...args: Args) => R

export type CallableWithThis<Args extends unknown[] = never[], R = unknown, This = never> = (
	this: This,
	...args: Args
) => R
