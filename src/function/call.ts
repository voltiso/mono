/**
 * Fixes the problem with TypeScript not inferring templated call correctly, even with strictBindCallApply=true
 */
export function call<ThisArg, Args extends unknown[], R>(
	fun: (this: ThisArg, ...args: Args) => R,
	thisArg: ThisArg,
	...args: Args
) {
	return fun.call(thisArg, ...args)
}
