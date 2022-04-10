/**
 * Fixes the problem with TypeScript not inferring templated call correctly, even with strictBindCallApply=true
 */
export function apply<ThisArg, Args extends unknown[], R>(
	fun: (this: ThisArg, ...args: Args) => R,
	thisArg: ThisArg,
	args: Args
) {
	return fun.apply(thisArg, args)
}
