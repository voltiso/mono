/**
 * Similar to the standard `InstanceType`
 *
 * Obtain the return type of a constructor function type
 *  - More strict version than in the standard lib - no `any` in definition to fix linting errors
 */
export type Instance<T extends abstract new (...args: never[]) => unknown> = T extends abstract new (
	...args: never[]
) => infer R
	? R
	: never
