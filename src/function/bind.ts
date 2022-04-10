/**
 * Fixes the problem with TypeScript not inferring templated call correctly, even with strictBindCallApply=true
 */
export function bind<ThisArg, Args extends unknown[], R>(
	fun: (this: ThisArg, ...args: Args) => R,
	thisArg: ThisParameterType<(this: ThisArg, ...args: Args) => R>
) {
	return fun.bind(thisArg)
}
